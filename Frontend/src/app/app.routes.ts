import { Routes } from '@angular/router';
import { EventosComponent } from './eventos/eventos.component';
import { AsistentesComponent } from './asistentes/asistentes.component';

export const routes: Routes = [
    { path: '', redirectTo: '/eventos', pathMatch: 'full'},
    { path: 'eventos', component: EventosComponent },
    { path: 'asistentes', component: AsistentesComponent },
    
]
