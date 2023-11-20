import {Component, OnInit} from '@angular/core';
import { MedicosService } from 'src/app/servicios/medicos.service';
import { ItemMedicoDTO } from 'src/app/modelo/item-medico-dto';
import {RegistroMedicoDTO} from "../../modelo/Admin/registro-medico-dto";
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { Alerta } from 'src/app/modelo/alerta';
import { AdminService } from 'src/app/servicios/admin.service';
import { ImagenService } from 'src/app/servicios/imagen.service';


@Component({
  selector: 'app-registro-medicos',
  templateUrl: './registro-medicos.component.html',
  styleUrls: ['./registro-medicos.component.css']
})
export class RegistroMedicosComponent implements OnInit{
  medicos: ItemMedicoDTO[];
  registroMedicoDTO: RegistroMedicoDTO;
  ciudades:string[];
  especialidad: String[];
  archivos!:FileList;
  alerta!: Alerta;


  constructor(private medicosService: MedicosService, private clinicaService: ClinicaService, private adminService: AdminService, private imagenService: ImagenService) {
    this.medicos = this.medicosService.listar();
    this.registroMedicoDTO = new RegistroMedicoDTO();

    this.ciudades = [];
    this.cargarCiudades();

    this.especialidad = [];
    this.cargarEspecialidad();
  }

  ngOnInit() {
    this.registrar();
  }

  public registrar() {

    this.adminService.crearMedico(this.registroMedicoDTO).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
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

  private cargarEspecialidad() {
    this.clinicaService.listarEspecialidades().subscribe({
      next: data => {
        this.especialidad = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.registroMedicoDTO.urlFoto = event.target.files[0].name;
      this.archivos = event.target.files;
    }
  }

  public subirImagen() {
    if (this.archivos != null && this.archivos.length > 0) {
      const formData = new FormData();
      formData.append('file', this.archivos[0]);
      this.imagenService.subirImagen(formData).subscribe({
        next: data => {
          this.registroMedicoDTO.urlFoto = data.respuesta.url;
        },
        error: error => {
          this.alerta = { mensaje: error.error, tipo: "danger" };
        }
      });
    } else {
      this.alerta = { mensaje: 'Debe seleccionar una imagen y subirla', tipo: "danger" };
    }
  }

  public sonIguales(): boolean {
    return this.registroMedicoDTO.password == this.registroMedicoDTO.confirmaPassword;
  }

  //protected readonly RegistroMedicoDTO = RegistroMedicoDTO;
}
