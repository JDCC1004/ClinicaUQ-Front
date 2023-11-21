import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import {RegistroMedicosComponent} from "./pagina/registro-medicos/registro-medicos.component";
import { ModificarPacienteComponent } from './pagina/modificar-paciente/modificar-paciente.component';
import { LoginGuard } from './guards/permiso.service';
import { RolesGuard } from './guards/roles.service';
import {GestionPqrsComponent} from "./pagina/gestion-pqrs/gestion-pqrs.component";
import {CrearPqrsComponent} from "./pagina/crear-pqrs/crear-pqrs.component";
import {AgendarCitaComponent} from "./pagina/agendar-cita/agendar-cita.component";
import {DetallePqrsComponent} from "./pagina/detalle-pqrs/detalle-pqrs.component";
import {HistorialCitasPacienteComponent} from "./pagina/historial-citas-paciente/historial-citas-paciente.component";
import {DetalleCitaComponent} from "./pagina/detalle-cita/detalle-cita.component";
import {AtenderCitaComponent} from "./pagina/atender-cita/atender-cita.component";
import {DetalleCitaMedicoComponent} from "./pagina/detalle-cita-medico/detalle-cita-medico.component";
import {DiaLibreComponent} from "./pagina/dia-libre/dia-libre.component";
import {HistorialCitasComponent} from "./pagina/historial-citas/historial-citas.component";
import {CambiarPasswordComponent} from "./pagina/cambiar-password/cambiar-password.component";
import {OlvidarPasswordComponent} from "./pagina/olvidar-password/olvidar-password.component";


const routes: Routes = [
  { path: "registro-medicos", component: RegistroMedicosComponent},
  { path: "modificar-paciente", component: ModificarPacienteComponent},
  { path: "modificar-paciente", component: ModificarPacienteComponent, canActivate:[RolesGuard], data: { expectedRole: ["paciente"]}},
  { path: "gestion-pqrs", component: GestionPqrsComponent, canActivate: [RolesGuard], data: { expectedRole: ["paciente"]}},
  { path: "agendar-cita", component: AgendarCitaComponent, canActivate: [RolesGuard], data: { expectedRole: ["paciente"]}},
  { path: "crear-pqrs", component: CrearPqrsComponent, canActivate: [RolesGuard], data: { expectedRole: ["paciente"]}},
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  { path: "registro", component: RegistroComponent, canActivate: [LoginGuard] },
  { path: "registro-medicos", component: RegistroMedicosComponent, canActivate: [RolesGuard], data: { expectedRole: ["admin"]}},
  { path: "detalle-pqrs", component: DetallePqrsComponent, canActivate:[RolesGuard], data: { expectedRole: ["paciente"]} },
  { path: "historial-citas-paciente", component: HistorialCitasPacienteComponent, canActivate:[RolesGuard], data: { expectedRole: ["paciente"]}},
  { path: "historial-citas", component: HistorialCitasComponent, canActivate:[RolesGuard], data: { expectedRole: ["medico"]}},
  { path: "detalle-cita/:codigo", component:DetalleCitaComponent, canActivate:[RolesGuard], data: { expectedRole: ["paciente"]}},
  { path: "atender-cita", component:AtenderCitaComponent,canActivate:[RolesGuard], data: { expectedRole: ["medico"]}},
  {path: "detalle-cita-medico/:codigo", component:DetalleCitaMedicoComponent, canActivate:[RolesGuard], data: {expectedRole: ["medico"]}},
  { path: "dia-libre", component:DiaLibreComponent, canActivate:[RolesGuard], data: {expectedRole: ["medico"]}},
  { path: "cambiar-password", component: CambiarPasswordComponent,canActivate:[RolesGuard], data: {expectedRole: ["paciente"]} },
  { path: "olvidar-password", component: OlvidarPasswordComponent},
  { path: "**", pathMatch: "full", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
