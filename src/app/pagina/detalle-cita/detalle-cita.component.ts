import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';
import {RegistroCitaDTO} from "../../modelo/Paciente/registro-cita-dto";
import {AuthService} from "../../servicios/auth.service";

@Component({
  selector: 'app-detalle-cita',
  templateUrl: './detalle-cita.component.html',
  styleUrls: ['./detalle-cita.component.css']
})
export class DetalleCitaComponent {
  especialidades: string[];
  registroCitaDTO: RegistroCitaDTO;
  alerta!: Alerta;
  codigoCita!: number;

  constructor(
      private authService: AuthService,
      private pacienteService: PacienteService,
      private tokenService: TokenService,
      private route:ActivatedRoute,
      private clinicaService: ClinicaService

  ){
    this.registroCitaDTO = new RegistroCitaDTO();
    this.obtenerCita();
    this.especialidades = [];
    this.cargarEspecialidades();
  }

  public obtenerCita() {
    // Validar si this.codigoCita es un número antes de hacer la solicitud
    if (!isNaN(this.codigoCita as any)) {
      this.pacienteService.verDetalleCita(+this.codigoCita).subscribe({
        next: (data) => {
          this.registroCitaDTO = data.respuesta;
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      console.error('El código de la cita no es un número válido.');
      // Puedes manejar este caso según tus necesidades, por ejemplo, mostrar un mensaje al usuario.
    }
  }


  private cargarEspecialidades() {
    this.clinicaService.listarEspecialidades().subscribe({
      next: (data) => {
        this.especialidades = data.respuesta;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public crearCita() {

    this.pacienteService.crearCita(this.registroCitaDTO).subscribe({
      next: (data) => {
        this.alerta = { mensaje: data.respuesta, tipo: 'success' };
      },
      error: (error) => {
        this.alerta = { mensaje: error.error.respuesta, tipo: 'danger' };
      },
    });
  }
}
