import { Component } from '@angular/core';
import { RegistroPacienteDTO } from "../../modelo/Paciente/registro-paciente-dto";
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Alerta } from 'src/app/modelo/alerta';
import { ImagenService } from 'src/app/servicios/imagen.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent {

  registroPacienteDTO: RegistroPacienteDTO;
  ciudades: string[];
  tiposSangre: String[];
  eps: String[];
  archivos!: FileList;
  alerta!: Alerta;

  constructor(private authService: AuthService, private clinicaService: ClinicaService, private imagenService: ImagenService) {
    this.registroPacienteDTO = new RegistroPacienteDTO();

    this.ciudades = [];
    this.cargarCiudades();

    this.tiposSangre = [];
    this.cargarTiposSangres();

    this.eps = [];
    this.cargarEPS();

  }

  public registrar() {
    if (this.registroPacienteDTO.urlFoto.length != 0) {

      this.authService.registrar(this.registroPacienteDTO).subscribe({
        next: data => {
          this.alerta = { mensaje: data.respuesta, tipo: "success" };
        },
        error: error => {
          this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
        }
      });
    } else {
      this.alerta = { mensaje: "Debe subir una imagen", tipo: "danger" };
    }
  }

  private cargarCiudades() {
    this.clinicaService.listarCiudades().subscribe({
      next: data => {
        this.ciudades = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  private cargarTiposSangres() {
    this.clinicaService.listarTipoSangre().subscribe({
      next: data => {
        this.tiposSangre = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  private cargarEPS() {
    this.clinicaService.listarEPS().subscribe({
      next: data => {
        this.eps = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public subirImagen() {
    if (this.archivos != null && this.archivos.length > 0) {
      const formData = new FormData();
      formData.append('file', this.archivos[0]);
      this.imagenService.subirImagen(formData).subscribe({
        next: data => {
          this.registroPacienteDTO.urlFoto = data.respuesta.url;
        },
        error: error => {
          this.alerta = { mensaje: error.error, tipo: "danger" };
        }
      });
    } else {
      this.alerta = { mensaje: 'Debe seleccionar una imagen y subirla', tipo: "danger" };
    }
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.registroPacienteDTO.urlFoto = event.target.files[0].name;
      this.archivos = event.target.files;
    }
  }

  public sonIguales(): boolean {
    return this.registroPacienteDTO.password == this.registroPacienteDTO.confirmaPassword;
  }

}
