import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { NuevaPasswordDTO } from 'src/app/modelo/NuevaPasswordDTO';
import { PacienteService } from 'src/app/servicios/paciente.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent {

  cambiarPassword: NuevaPasswordDTO;
  alerta!: Alerta;

  constructor(private pacienteService: PacienteService){
    this.cambiarPassword = new NuevaPasswordDTO();
  }

  public sonIguales(): boolean {
    return this.cambiarPassword.passwordNueva === this.cambiarPassword.passwordAntigua;
  }

  newCambiarPassword(){
    this.pacienteService.cambiarPassword(this.cambiarPassword).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: 'success'};
      },
      error: error => {
        this.alerta = { mensaje: error.error.mensaje, tipo: 'danger'};
      }
    }); }

  protected readonly NuevaPasswordDTO = NuevaPasswordDTO;
}
