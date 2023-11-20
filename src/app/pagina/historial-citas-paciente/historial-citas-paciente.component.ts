import { Component } from '@angular/core';
import { CitasPacienteDTO } from 'src/app/modelo/citas-paciente-dto';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-historial-citas-paciente',
  templateUrl: './historial-citas-paciente.component.html',
  styleUrls: ['./historial-citas-paciente.component.css'],
})
export class HistorialCitasPacienteComponent {
  citas: CitasPacienteDTO[];

  constructor(
      private pacienteService: PacienteService,
      private tokenService: TokenService
  ) {
    this.citas = [];
    this.obtenerCita();
  }

  public obtenerCita() {
    let codigo = this.tokenService.getCodigo();
    this.pacienteService.listarCitasPaciente(codigo).subscribe({
      next: (data) => {
        this.citas = data.respuesta;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }


}
