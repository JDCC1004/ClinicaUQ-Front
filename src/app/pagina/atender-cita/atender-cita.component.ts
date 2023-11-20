import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { AtenderCitaService } from 'src/app/servicios/atender-cita.service';
import {AtenderCitaDTO} from "../../modelo/atenderCitaDTO";

@Component({
  selector: 'app-atender-cita',
  templateUrl: './atender-cita.component.html',
  styleUrls: ['./atender-cita.component.css']
})
export class AtenderCitaComponent {
  alerta!: Alerta;

  atenderCitaDTO: AtenderCitaDTO;
  constructor(private atenderCitaService: AtenderCitaService) {
    this.atenderCitaDTO = new AtenderCitaDTO();
  }
  public atenderCita() {
    const objeto = this;
    this.atenderCitaService.atenderCita(this.atenderCitaDTO).subscribe({
      next: (data) => {
        this.alerta = { mensaje: data.respuesta, tipo: 'success' };
      },
      error: (error) => {
        this.alerta = { mensaje: error.error.respuesta, tipo: 'danger' };
      }
    });
  }






}
