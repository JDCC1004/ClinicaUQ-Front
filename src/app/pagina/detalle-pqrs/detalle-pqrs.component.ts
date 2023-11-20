import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { ItemPQRSDTO} from "../../modelo/ItemPQRSDTO";
import { PacienteService } from 'src/app/servicios/paciente.service';
import { PqrsService } from 'src/app/servicios/pqrs.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-detalle-pqrs',
  templateUrl: './detalle-pqrs.component.html',
  styleUrls: ['./detalle-pqrs.component.css'],
})
export class DetallePqrsComponent{
  codigoPqrs: string = '';
  itemPQRSDTO: ItemPQRSDTO;
  pqrs: any;
  alerta!: Alerta;
  codigo!: number;

  constructor(
      private route: ActivatedRoute,
      private pqrsService: PqrsService,
      private tokenService: TokenService,
      private pacienteService: PacienteService
  ) {

    // @ts-ignore
    this.itemPQRSDTO = new ItemPQRSDTO();
    let codigo = this.tokenService.getCodigo();

    this.route.params.subscribe((params) => {
      this.codigo = params['codigo'];

      this.pqrsService.verDetallePQRS(this.codigo).subscribe({
        next: (data) => {
          this.itemPQRSDTO = data.respuesta;
        },
        error: (error) => {
          console.log(error);
        },
      });
    });
  }
}
