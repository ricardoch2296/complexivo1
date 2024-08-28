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
  selector: 'app-asignar',
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
  templateUrl: './asignar.component.html',
  styleUrl: './asignar.component.css',
})
export class AsignarComponent {
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
    this.load_data();
  }

  load_data() {
    this.service.getAllAsistentes().subscribe((data) => {
      this.data = data;
    });
  }

  onSubmit() {
    this.service.updateAsistente(this.item).subscribe((data) => {
      console.log(data);
      this.showToast('Agregado con éxito');
      this.close();
    });
  }

  showToast(mesage: string) {
    this.toast.open(mesage, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center', 
      verticalPosition: 'bottom',
    });
  }

  close() {
    this.modal.close();
  }
}
