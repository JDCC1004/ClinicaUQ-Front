import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Alerta } from 'src/app/modelo/alerta';

import { ClinicaService } from 'src/app/servicios/clinica.service';

import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';
import {DetalleCitaMedicoDTO} from "../../modelo/Medico/detalleCitaMedicoDTO";
import {AuthService} from "../../servicios/auth.service";
import {MedicosService} from "../../servicios/medicos.service";

@Component({
  selector: 'app-detalle-cita-medico',
  templateUrl: './detalle-cita-medico.component.html',
  styleUrls: ['./detalle-cita-medico.component.css']
})
export class DetalleCitaMedicoComponent {

detalleCitaMedicoDTO: DetalleCitaMedicoDTO | undefined;
  alerta!: Alerta;
  codigoCita!: number;


  constructor(private route: ActivatedRoute, private medicoService: MedicosService, private tokenService: TokenService, private clinicaService: ClinicaService){


    this.route.params.subscribe((params) => {
      //this.codigoCita = params['codigoCita'];
      const codigoCita = params['codigoCita'];
      this.obtenerDatos(codigoCita)
    });

  }

  public obtenerDatos(codigoCita: number) {
    this.medicoService.verDetalleCita(codigoCita).subscribe({
    next: data => {
    this.detalleCitaMedicoDTO = data.respuesta;
    },
    error: error => {
    console.log(error);
    }
    });
  }

  //protected readonly DetalleCitaMedicoDTO = DetalleCitaMedicoDTO;
}
