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
import { EditarAsistenteComponent } from '../editar-asistente/editar-asistente.component';
import { CrearAsistenteComponent } from '../crear-asistente/crear-asistente.component';

@Component({
  selector: 'app-asistentes',
  standalone: true,
  imports: [
    MatListModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './asistentes.component.html',
  styleUrl: './asistentes.component.css'
})
export class AsistentesComponent {
  asistentes: any[] = [];

  constructor(private service: GlobalService, private router: Router, private toast:MatSnackBar, public modal:MatDialog) {}

  ngOnInit(): void {
    this.load_data();   
  }

  onDelete(evento: any): void {
    this.service.deleteAsistente(evento).subscribe((data) => {
      this.showToast('Eliminado correctamente');
      this.load_data();
    })

  }

  onEdit(evento: any): void {
    this.service.clicked(evento);
    this.openModalEdit();
  }

  load_data() {
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
  
  clickEventos(){
    this.navigateTo('eventos');
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

  openModal(): void {
    const modal = this.modal.open(CrearAsistenteComponent, {
      width: '600px',
      data: { message: 'Añadir item' },
    });

    modal.afterClosed().subscribe((result) => {
      this.load_data();
    });
  }

  openModalEdit(): void {
    const modal = this.modal.open(EditarAsistenteComponent, {
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

}
