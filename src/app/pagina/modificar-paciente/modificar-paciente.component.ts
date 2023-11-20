import { Component } from '@angular/core';
import { RegistroPacienteDTO } from "../../modelo/Paciente/registro-paciente-dto";
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Alerta } from 'src/app/modelo/alerta';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { DetallePacienteDTO } from 'src/app/modelo/detalle-paciente-dto';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';
import { ActualizarPacienteDTO } from 'src/app/modelo/actualizar-paciente-dto';

@Component({
  selector: 'app-modificar-paciente',
  templateUrl: './modificar-paciente.component.html',
  styleUrls: ['./modificar-paciente.component.css']
})

export class ModificarPacienteComponent {

  detallePacienteDTO: DetallePacienteDTO;
  ciudades: string[];
  tiposSangre: String[];
  eps: String[];
  archivos!: FileList;
  alerta!: Alerta;

  constructor(private pacienteService: PacienteService, private tokenService: TokenService, private clinicaService: ClinicaService, private imagenService: ImagenService) {

    this.detallePacienteDTO = new ActualizarPacienteDTO();
    this.obtenerPaciente();


    this.ciudades = [];
    this.cargarCiudades();

    this.tiposSangre = [];
    this.cargarTiposSangres();

    this.eps = [];
    this.cargarEPS();

  }

  public obtenerPaciente() {
    let codigo = this.tokenService.getCodigo();
    this.pacienteService.verDetallePaciente(codigo).subscribe({
    next: data => {
    this.detallePacienteDTO = data.respuesta;
    },
    error: error => {
    console.log(error);
    }
    });
  }

  public modificarDatos() {
    if (this.detallePacienteDTO.urlFoto.length != 0) {

      this.pacienteService.editarPerfil(this.detallePacienteDTO).subscribe({
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
          this.detallePacienteDTO.urlFoto = data.respuesta.url;
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
      this.detallePacienteDTO.urlFoto = event.target.files[0].name;
      this.archivos = event.target.files;
    }
  }

}
