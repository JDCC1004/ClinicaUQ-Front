import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';

import { TokenService } from 'src/app/servicios/token.service';
import {DiaLibreDTO} from "../../modelo/diaLibreDTO";
import {MedicosService} from "../../servicios/medicos.service";

@Component({
  selector: 'app-dia-libre',
  templateUrl: './dia-libre.component.html',
  styleUrls: ['./dia-libre.component.css'],
})
export class DiaLibreComponent {
  alerta!: Alerta;

  diaLibreDTO: DiaLibreDTO;

  constructor(
      private medicoService: MedicosService,
      private tokenService: TokenService
  ) {
    this.diaLibreDTO = new DiaLibreDTO();
  }
  public agendarDiaLibre() {
    let codigo = this.tokenService.getCodigo();
    console.log('Código del médico:', codigo);

    this.diaLibreDTO.codigoMedico = codigo;

    console.log('DiaLibreDTO antes de la llamada:', this.diaLibreDTO);

    this.medicoService.agendarDiaLibre(this.diaLibreDTO).subscribe({
      next: (data) => {
        console.log('Respuesta del servicio:', data);

        if (data && data.respuesta) {
          this.alerta = { mensaje: data.respuesta, tipo: 'success' };
        } else {
          console.error('La respuesta del servicio no tiene el campo esperado.');
          this.alerta = { mensaje: 'Error en la respuesta del servicio', tipo: 'danger' };
        }
      },
      error: (error) => {
        console.error('Error del servicio:', error);
        this.alerta = { mensaje: error.error.respuesta, tipo: 'danger' };
      },
    });
  }

}


