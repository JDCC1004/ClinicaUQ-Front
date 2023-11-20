import { Component } from '@angular/core';
import {AgendarCitaDTO} from "../../modelo/AgendarCitaDTO";
import {PacienteService} from "../../servicios/paciente.service";
import {Alerta} from "../../modelo/alerta";
import { ClinicaService } from 'src/app/servicios/clinica.service';
import {MedicosService} from "../../servicios/medicos.service";
import {ActualizarPacienteDTO} from "../../modelo/actualizar-paciente-dto";
import {TokenService} from "../../servicios/token.service";
import {MedicoPDTO} from "../../modelo/Paciente/MedicoPDTO";
import {DetallePacienteDTO} from "../../modelo/detalle-paciente-dto";

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent {
    detallePacienteDTO: DetallePacienteDTO;
    MedicoPDTO: MedicoPDTO;
  agendarCita: AgendarCitaDTO;
  alerta!: Alerta;
  especialidad: string[];
  medicos: any[];
  medicoSeleccionado: any;

  medicoSeleccionadoCodigo: number;



    constructor(private pacienteService: PacienteService, private clinicaService: ClinicaService, private medicosService: MedicosService, private  tokenService: TokenService){

        this.agendarCita = new AgendarCitaDTO();

        this.detallePacienteDTO = new ActualizarPacienteDTO();
        this.obtenerPaciente();
        this.MedicoPDTO = new MedicoPDTO();
        this.obtenerMedico();


        this.medicoSeleccionadoCodigo = 0

        this.especialidad = [];
        this.medicos = [];
        this.cargarEspecialidad();

    }

    public cargarMedicos(especialidad: string){
        this.pacienteService.listarMedicosEspecialidad(especialidad).subscribe({
            next: data => {
                this.medicos = data.respuesta;
            },
            error: error => {
                console.log(error);
            }
        });
    }


    public seleccionarMedico(medico: any) {
        this.medicoSeleccionado = medico;

        this.medicoSeleccionadoCodigo = medico.codigo;
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

    public agendar(codigoPaciente: number, codigoMedico: number){
      this.agendarCita.codigoPaciente = codigoPaciente;
      this.agendarCita.codigoMedico = codigoMedico;
        this.pacienteService.agendarCita(this.agendarCita).subscribe({
            next: data => {
                this.alerta = {mensaje: data.respuesta, tipo: "success"};
            },
            error: error => {
                this.alerta = {mensaje: error.error.respuesta, tipo: "danger"};
            }
        });
    }

    public obtenerMedico() {
        let codigoPaciente = this.tokenService.getCodigo();
        this.pacienteService.verDetalleMedico(codigoPaciente).subscribe({
            next: data => {
                let codigoMedico = data.respuesta.codigoMedico;
                this.agendar(codigoPaciente, codigoMedico);
            },
            error: error => {
                console.log(error);
            }
        });
    }
    protected readonly AgendarCitaDTO = AgendarCitaDTO;
}
