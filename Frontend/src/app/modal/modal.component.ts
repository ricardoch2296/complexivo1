import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../global.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { EventosComponent } from '../eventos/eventos.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  public item: any = {};
  public data: any[] = [];
  public validador: boolean = false;

  constructor(
    private service: GlobalService,
    private router: Router,
    private toast: MatSnackBar,
    public modal: MatDialogRef<EventosComponent>
  ) {}

  ngOnInit() {

  }

  onSubmit() {
    this.validar();
    if (this.validador) {
      this.service.createEvento(this.item).subscribe((data) => {
        console.log(data);
        this.showToast('Agregado con éxito');
        this.close();
      });
    }
    else{
      this.showToast('Completa todos los campos');
    }
  }


  showToast(mesage: string) {
    this.toast.open(mesage, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center', // Posición horizontal: 'start', 'center', 'end', 'left', 'right'
      verticalPosition: 'bottom', // Posición vertical: 'top', 'bottom'
    });
  }

  close() {
    this.modal.close();
  }

  validar() {
    if (
      this.item.titulo &&
      this.item.descripcion &&
      this.item.fecha &&
      this.item.imagen
    ) {
      this.validador = true;
    } else {
      this.validador = false;
    }
  }
}
