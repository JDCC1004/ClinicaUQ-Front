import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { DetallePacienteDTO } from '../modelo/detalle-paciente-dto';
import { RegistroPQRSDTO } from '../modelo/registro-pqrs-dto';
import { AgendarCitaDTO } from '../modelo/AgendarCitaDTO';
import {MedicoPDTO} from "../modelo/Paciente/MedicoPDTO";
import {RegistroCitaDTO} from "../modelo/Paciente/registro-cita-dto";

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private userUrl = "http://localhost:8080/api/pacientes";
  constructor(private http: HttpClient) { }
  public verDetallePaciente(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/detalle/${codigo}`);
  }
  public verDetalleMedico(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/detalleMedico/${codigo}`);
  }
  public eliminarCuenta(codigo: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.userUrl}/eliminar/${codigo}`);
  }
  public editarPerfil(pacienteDTO: DetallePacienteDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.userUrl}/editarPerfil`, pacienteDTO);
  }
  public crearPQRS(registroPQRSDTO: RegistroPQRSDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userUrl}/crear-pqrs`, registroPQRSDTO);
  }
  public listarPQRSPaciente(codigoPaciente: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/listar-pqrs/${codigoPaciente}`);
    }
  public agendarCita(citaPacienteDTO: AgendarCitaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userUrl}/agendarCita`, citaPacienteDTO);
  }

  public listarMedicosEspecialidad(especialidad: string): Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.userUrl}/listarMedicoEspecialidad/${especialidad}`);
  }

  public listarCitasPqrs(codigoPaciente: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
        `${this.userUrl}/listar/${codigoPaciente}`
    );
  }
  public listarCitasPaciente(codigoPaciente: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
        `${this.userUrl}/listar/${codigoPaciente}`
    );
  }
  public crearCita(registroCitaDTO: RegistroCitaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(
        `${this.userUrl}/agendarCita`,
        registroCitaDTO
    );
  }

  public crearPqrs(RegistroPQRSDTO: RegistroPQRSDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(
        `${this.userUrl}/crearPQRSP`,
        RegistroPQRSDTO
    );
  }
  public verDetalleCita(codigoCita: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
        `${this.userUrl}/listar/${codigoCita}`
    );
  }

}
