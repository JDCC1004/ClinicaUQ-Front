import { Component } from '@angular/core';
import { RegistroPQRSDTO } from 'src/app/modelo/registro-pqrs-dto';
import { PqrsService } from 'src/app/servicios/pqrs.service';
import { ClinicaService } from "../../servicios/clinica.service";
import { TokenService } from "../../servicios/token.service";
import { Alerta } from "../../modelo/alerta";
import { PacienteService } from "../../servicios/paciente.service";

@Component({
  selector: 'app-crear-pqrs',
  templateUrl: './crear-pqrs.component.html',
  styleUrls: ['./crear-pqrs.component.css'],
})
export class CrearPqrsComponent {

  citaPacienteDTO: RegistroPQRSDTO[];
  tiposPqrs: string[];
  tiposCitasPqrs: string[];
  alerta!: Alerta;

  registroPQRSDTO: RegistroPQRSDTO;

  constructor(
      private pqrsService: PqrsService,
      private clinicaService: ClinicaService,
      private pacienteService:PacienteService,
      private tokenService: TokenService)
  {
    this.registroPQRSDTO = new RegistroPQRSDTO();
    this.cargarTiposPQRS();
    this.cargarCitasPqrs();
    this.tiposPqrs = [];
    this.citaPacienteDTO = [];
    this.tiposCitasPqrs = [];
  }
  public crearPqrs() {

    this.pacienteService.crearPqrs(this.registroPQRSDTO).subscribe({
      next: (data) => {
        this.alerta = { mensaje: data.respuesta, tipo: 'success' };
      },
      error: (error) => {
        this.alerta = { mensaje: error.error.respuesta, tipo: 'danger' };
      },
    });

  }
  public seleccionar(codigoCita: number) {
    this.registroPQRSDTO.codigoCita = codigoCita;
  }

  private cargarTiposPQRS() {
    this.clinicaService.listarTiposPqrs().subscribe({
      next: (data) => {
        this.tiposPqrs = data.respuesta;
      },
      error: (error) => {
        console.log("Error al cargar tipos de PQRS:", error);
      },
    });
  }


  private cargarCitasPqrs() {
    let codigo = this.tokenService.getCodigo();

    this.registroPQRSDTO.codigoPaciente = codigo;
    this.pacienteService.listarCitasPqrs(codigo).subscribe({
      next: (data) => {
        this.citaPacienteDTO = data.respuesta;
      },
      error: (error) => {
        console.log("Error al cargar citas PQRS:", error);
      },
    });
  }


}
