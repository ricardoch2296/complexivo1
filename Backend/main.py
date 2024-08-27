from db import db_connection, close_connection
from flask import Flask, jsonify, request
from psycopg2.extras import RealDictCursor
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
var = 'evento'

@app.route('/', methods = ['GET'])
def index():
    return jsonify({'message': 'API'}), 200

@app.route('/eventos', methods = ['GET'])
def read_all_eventos():
    conn = db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM eventos")
    rows = cursor.fetchall()
    resultados = leer_resultados(rows)
    resultados = convertir_str(resultados, 'fecha')
    resultados = ordenar_clave(resultados, 'id')
    close_connection(cursor, conn)
    return jsonify(resultados), 200

  
@app.route('/eventos/<int:id>', methods=['GET'])
def get_evento_id(id):
    conn = db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM eventos WHERE id = %s", (id,))
    row = cursor.fetchone()
    close_connection(cursor, conn)
    if row:
        return jsonify(dict(row)), 200
    else:
        return jsonify({'message': 'Evento no encontrado'}), 404


@app.route('/eventos', methods= ['POST'])
def create_evento():
    data = request.get_json()
    titulo = data['titulo']
    descripcion = data.get('descripcion', '')
    fecha = data['fecha']
    imagen = data.get('imagen', '')

    conn = db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("INSERT INTO eventos (titulo, descripcion, fecha, imagen) VALUES (%s, %s, %s, %s)",
                   (titulo, descripcion, fecha, imagen))
    conn.commit()
    close_connection(cursor, conn)
    return jsonify({'message': 'Evento creado con éxito'}), 201


@app.route('/eventos/<int:id>', methods = ['PUT'])
def update_evento(id):
    data = request.get_json()
    titulo = data['titulo']
    descripcion = data.get('descripcion', '')
    fecha = data['fecha']
    imagen = data.get('imagen', '')

    conn = db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("UPDATE eventos SET titulo = %s, descripcion = %s, fecha = %s, imagen = %s WHERE id = %s",
                   (titulo, descripcion, fecha, imagen, id))
    conn.commit()
    close_connection(cursor, conn)
    return jsonify({'message': 'Evento actualizado con éxito'}), 200


@app.route('/eventos/<int:id>', methods = ['DELETE'])
def delete_evento(id):
    conn = db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("DELETE FROM eventos WHERE id = %s", (id,))
    conn.commit()
    close_connection(cursor, conn)
    return jsonify({'message': 'Evento eliminado con éxito'}), 200


# CRUD para asistentes
@app.route('/asistentes', methods=['GET'])
def get_all_asistentes():
    conn = db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM asistentes")
    rows = cursor.fetchall()
    resultados = leer_resultados(rows)
    close_connection(cursor, conn)
    return jsonify(resultados), 200

@app.route('/asistentes/<int:id>', methods=['GET'])
def get_asistente_by_id(id):
    conn = db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM asistentes WHERE id = %s", (id,))
    row = cursor.fetchone()
    close_connection(cursor, conn)
    if row:
        return jsonify(dict(row)), 200
    else:
        return jsonify({'message': 'Asistente no encontrado'}), 404

@app.route('/asistentes', methods=['POST'])
def create_asistente():
    data = request.get_json()
    nombre = data['nombre']
    email = data['email']

    conn = db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("INSERT INTO asistentes ( nombre, email) VALUES ( %s, %s)",
                   (nombre, email))
    conn.commit()
    close_connection(cursor, conn)
    return jsonify({'message': 'Asistente registrado con éxito'}), 201

@app.route('/asistentes/<int:id>', methods=['PUT'])
def update_asistente(id):
    data = request.get_json()
    evento_id = data['evento_id']
    nombre = data['nombre']
    email = data['email']

    conn = db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("UPDATE asistentes SET evento_id = %s, nombre = %s, email = %s WHERE id = %s",
                   (evento_id, nombre, email, id))
    conn.commit()
    close_connection(cursor, conn)
    return jsonify({'message': 'Asistente actualizado con éxito'}), 200

@app.route('/asistentes/<int:id>', methods=['DELETE'])
def delete_asistente(id):
    conn = db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("DELETE FROM asistentes WHERE id = %s", (id,))
    conn.commit()
    close_connection(cursor, conn)
    return jsonify({'message': 'Asistente eliminado con éxito'}), 200

def leer_resultados(rows):
    resultados = [ dict(row) for row in rows]
    return resultados

def convertir_str (resultados, key):
    for i in resultados:
        i[key] = str(i[key])    
    return resultados

def ordenar_clave(resultados, clave):
    resultados_ordenados = sorted(resultados, key=lambda persona: persona[clave])
    return resultados_ordenados


if '__main__' == __name__:
    app.run()



