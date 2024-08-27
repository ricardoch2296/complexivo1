import psycopg2

def db_connection():
    try:
        conn = psycopg2.connect(database="postgres", user="postgres", password="12345", host='localhost')
    except:
        print("Error conectando")
    return conn

def close_connection(cursor, conn):
    try:
        cursor.close()
        conn.close()
    except:
        print("Error Cerrando Conexión")
        
