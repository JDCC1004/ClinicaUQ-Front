import { Component } from '@angular/core';
import { RegistroCitaDTO } from 'src/app/modelo/Paciente/registro-cita-dto';
import {MedicosService} from "../../servicios/medicos.service";
import {TokenService} from "../../servicios/token.service";
import {ClinicaService} from "../../servicios/clinica.service";

@Component({
  selector: 'app-historial-citas',
  templateUrl: './historial-citas.component.html',
  styleUrls: ['./historial-citas.component.css']
})
export class HistorialCitasComponent {

  citas: RegistroCitaDTO[];
  constructor(private medicosService: MedicosService, private tokenService: TokenService, private clinicaService: ClinicaService){
    this.citas = [];
    this.obtenerCitas();

  }
  public obtenerCitas() {
    let codigo = this.tokenService.getCodigo();
    this.medicosService.listarCitas(codigo).subscribe({
      next: data => {
        this.citas = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
