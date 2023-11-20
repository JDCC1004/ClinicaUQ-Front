import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { RegistroPQRSDTO } from '../modelo/registro-pqrs-dto';
import { DetallePacienteDTO } from '../modelo/detalle-paciente-dto';
import { AtenderCitaDTO } from '../modelo/atenderCitaDTO';

@Injectable({
    providedIn: 'root',
})
export class AtenderCitaService {
    private userUrl = 'http://localhost:8081/api/medicos';
    constructor(private http: HttpClient) {}
    public verDetallePaciente(codigo: number): Observable<MensajeDTO> {
        return this.http.get<MensajeDTO>(`${this.userUrl}/detalle/${codigo}`);
    }
    public eliminarCuenta(codigo: number): Observable<MensajeDTO> {
        return this.http.delete<MensajeDTO>(`${this.userUrl}/eliminar/${codigo}`);
    }
    public editarPerfil(pacienteDTO: DetallePacienteDTO): Observable<MensajeDTO> {
        return this.http.put<MensajeDTO>(
            `${this.userUrl}/editar-perfil`,
            pacienteDTO
        );
    }
    public atenderCita(atenderCitaDTO: AtenderCitaDTO): Observable<MensajeDTO> {
        return this.http.post<MensajeDTO>(`${this.userUrl}/atenderCita`, atenderCitaDTO);
    }
    public listarPQRSPaciente(codigoPaciente: number): Observable<MensajeDTO> {
        return this.http.get<MensajeDTO>(
            `${this.userUrl}/listar-pqrs/${codigoPaciente}`
        );
    }
}
