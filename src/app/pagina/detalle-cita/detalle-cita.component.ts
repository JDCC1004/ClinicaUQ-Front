import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';
import { RegistroCitaDTO} from "../../modelo/Paciente/registro-cita-dto";
import { AuthService} from "../../servicios/auth.service";
import { DetalleCitaDTO} from "../../modelo/Paciente/DetalleCitaDTO";

@Component({
  selector: 'app-detalle-cita',
  templateUrl: './detalle-cita.component.html',
  styleUrls: ['./detalle-cita.component.css']
})
export class DetalleCitaComponent {

  detalleCitaDTO: DetalleCitaDTO | undefined;
  codigoCita!: number;

  constructor(
      private authService: AuthService,
      private pacienteService: PacienteService,
      private tokenService: TokenService,
      private route: ActivatedRoute,
      private clinicaService: ClinicaService
  ) {

    this.route.params.subscribe((params) => {
      this.codigoCita = params['codigo'];
    });

    this.obtenerDatosCita();
  }

  public obtenerDatosCita() {
    this.pacienteService.verDetalleCita(this.codigoCita).subscribe({
      next: data => {
        this.detalleCitaDTO = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
