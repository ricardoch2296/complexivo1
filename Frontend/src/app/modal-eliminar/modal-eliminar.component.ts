import { Component } from '@angular/core';
import { GlobalService } from '../global.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { EventosComponent } from '../eventos/eventos.component';
//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


@Component({
  selector: 'app-modal-eliminar',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './modal-eliminar.component.html',
  styleUrl: './modal-eliminar.component.css',
})
export class ModalEliminarComponent {
  constructor(
    private service: GlobalService,
    private router: Router,
    private toast: MatSnackBar,
    public modal: MatDialogRef<EventosComponent>
  ) {}

  showToast(mesage: string) {
    this.toast.open(mesage, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  click_delete() {
    this.service.deleteEvento(this.service.get_clicked()).subscribe((data) => {
      this.showToast('Eliminado correctamente');
      this.close();
      this.router.navigate(['/eventos']);
    });
  }

  close() {
    this.modal.close();
  }
}
