
import { Component, OnInit } from '@angular/core';
import { ItemPQRSDTO } from 'src/app/modelo/ItemPQRSDTO';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-gestion-pqrs',
  templateUrl: './gestion-pqrs.component.html',
  styleUrls: ['./gestion-pqrs.component.css']
})
export class GestionPqrsComponent implements OnInit {
  obtenerCodigoPaciente: any;
  pqrs: any;



  constructor(private pacienteService: PacienteService, private tokenService: TokenService) {}

  ngOnInit() {
    this.obtenerPqrs();
  }

  obtenerPqrs() {
    const codigo = this.obtenerCodigoPaciente();

    if (codigo !== undefined) {
      const codigoString: string = codigo.toString();

      this.pacienteService.listarPQRSPaciente(1).subscribe({
        next: data => {
          if (data && data.respuesta) {
            // Supongamos que ItemPQRSDTO tiene una propiedad llamada 'descripcion'
            // this.pqrs = data.respuesta.map(descripcion => ({ descripcion }));
          } else {
            console.error('La respuesta del servicio no contiene datos válidos.');
          }
        },
        error: error => {
          console.log(error);
        }
      });
    } else {
      console.error('No se pudo obtener el código del paciente.');
    }
  }


  // private obtenerCodigoPaciente(): string | undefined {
  // return this.tokenService.getCodigo();
  // }

}
