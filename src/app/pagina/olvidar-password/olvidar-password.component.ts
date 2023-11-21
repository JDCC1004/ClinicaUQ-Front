import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { NuevaPasswordOlvidadaDTO } from 'src/app/modelo/NuevaPasswordOlvidadaDTO';
import { PacienteService } from 'src/app/servicios/paciente.service';

@Component({
  selector: 'app-olvidar-password',
  templateUrl: './olvidar-password.component.html',
  styleUrls: ['./olvidar-password.component.css']
})
export class OlvidarPasswordComponent {

  cambiarPasswordOlvidada: NuevaPasswordOlvidadaDTO;
  alerta!: Alerta;

  constructor(private pacienteService: PacienteService){
    this.cambiarPasswordOlvidada = new NuevaPasswordOlvidadaDTO();
  }

  CambiarPasswordOlvidada(){
    this.pacienteService.cambiarPasswordOlvidada(this.cambiarPasswordOlvidada).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: 'success'};
      },
      error: error => {
        this.alerta = { mensaje: error.error.mensaje, tipo: 'danger'};
      }
    }); }

  protected readonly NuevaPasswordOlvidadaDTO = NuevaPasswordOlvidadaDTO;
}
