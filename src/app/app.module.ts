import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { RegistroMedicosComponent } from './pagina/registro-medicos/registro-medicos.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AlertaComponent } from './pagina/alerta/alerta.component';
import { GestionPqrsComponent } from './pagina/gestion-pqrs/gestion-pqrs.component';
import { ModificarPacienteComponent } from './pagina/modificar-paciente/modificar-paciente.component';
import { UsuarioInterceptor } from './interceptor/usuario.interceptor';
import { AgendarCitaComponent } from './pagina/agendar-cita/agendar-cita.component';
import { CrearPqrsComponent } from './pagina/crear-pqrs/crear-pqrs.component';
import { DetallePqrsComponent } from './pagina/detalle-pqrs/detalle-pqrs.component';
import { DetalleCitaComponent } from './pagina/detalle-cita/detalle-cita.component';
//import { DetalleCitaMedicoComponent } from './pagina/detalle-cita-medico/detalle-cita-medico.component';
import { HistorialCitasPacienteComponent } from './pagina/historial-citas-paciente/historial-citas-paciente.component';
import { HistorialCitasComponent } from './pagina/historial-citas/historial-citas.component';
import { AtenderCitaComponent } from './pagina/atender-cita/atender-cita.component';
import { DiaLibreComponent } from './pagina/dia-libre/dia-libre.component';
//import { GestionCitaComponent } from './pagina/gestion-cita/gestion-cita.component';
import { GestionMedicosComponent } from './pagina/gestion-medicos/gestion-medicos.component';
import { DetalleCitaMedicoComponent } from './pagina/detalle-cita-medico/detalle-cita-medico.component';
import { CambiarPasswordComponent } from './pagina/cambiar-password/cambiar-password.component';
import { OlvidarPasswordComponent } from './pagina/olvidar-password/olvidar-password.component';
//import { FondoComponent } from './fondo/fondo.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    RegistroMedicosComponent,
    AlertaComponent,
    GestionPqrsComponent,
    ModificarPacienteComponent,
    AgendarCitaComponent,
    CrearPqrsComponent,
    DetallePqrsComponent,
    DetalleCitaComponent,
    ///DetalleCitaMedicoComponent,
    HistorialCitasPacienteComponent,
    HistorialCitasComponent,
    AtenderCitaComponent,
    DiaLibreComponent,
    //GestionCitaComponent,
    GestionMedicosComponent,
    DetalleCitaMedicoComponent,
    CambiarPasswordComponent,
    OlvidarPasswordComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UsuarioInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
