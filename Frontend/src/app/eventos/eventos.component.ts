import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { GlobalService } from '../global.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog'; //componente main
import { ModalComponent } from '../modal/modal.component';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component';
import { ModalEliminarComponent } from '../modal-eliminar/modal-eliminar.component';
import { AsignarComponent } from '../asignar/asignar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatListModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
})
export class EventosComponent {
  eventos: any[] = [];
  asistentes: any[] = [];

  constructor(
    private service: GlobalService,
    private router: Router,
    private toast: MatSnackBar,
    public modal: MatDialog
  ) {}

  ngOnInit(): void {
    this.load_data();
    this.load_asistentes();
  }

  onDelete(evento: any): void {
    this.service.clicked(evento);
    this.openModalDelete();
  }

  onEdit(evento: any): void {
    this.service.clicked(evento);
    this.openModalEdit();
  }

  load_data() {
    this.service.getAllEventos().subscribe((data) => {
      this.eventos = data;
    });
  }

  load_asistentes() {
    this.service.getAllAsistentes().subscribe((data) => {
      this.asistentes = data;
    });
  }

  click_edit(item: any) {
    this.service.clicked(item);
    this.navigateTo('tipo');
  }

  desplegar_participantes(evento: any) {
    evento.desplegar_participantes = !evento.desplegar_participantes;
  }

  clickAsistentes() {
    this.navigateTo('asistentes');
  }

  asignar() {
    this.openModalAsignar()

  }

  showToast(mensaje: string) {
    this.toast.open(mensaje, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center', // Posición horizontal: 'start', 'center', 'end', 'left', 'right'
      verticalPosition: 'bottom', // Posición vertical: 'top', 'bottom'
    });
  }

  navigateTo(section: string) {
    switch (section) {
      case 'eventos':
        this.router.navigate(['/eventos']);
        break;
      case 'asistentes':
        this.router.navigate(['/asistentes']);
        break;
    }
  }

  displayedColumns: string[] = [
    'indice',
    'nombre',
    'precio',
    'tipo',
    'cantidad',
    'acciones',
  ];
  dataSource = new MatTableDataSource(this.eventos);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModal(): void {
    const modal = this.modal.open(ModalComponent, {
      width: '600px',
      data: { message: 'Añadir item' },
    });

    modal.afterClosed().subscribe((result) => {
      this.load_data();
    });
  }

  openModalEdit(): void {
    const modal = this.modal.open(ModalEditarComponent, {
      width: '400px',
      data: { message: 'Editar Evento' },
    });

    modal.afterClosed().subscribe((result) => {
      this.load_data();
    });
  }

  openModalDelete(): void {
    const modal = this.modal.open(ModalEliminarComponent, {
      width: '400px',
      data: { message: 'Eliminar Evento' },
    });

    modal.afterClosed().subscribe((result) => {
      this.load_data();
    });
  }

  openModalAsignar(): void {
    const modal = this.modal.open(AsignarComponent, {
      width: '400px',
      data: { message: 'Asignar Asistente' },
    });
  }
}
