import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { LoginDTO } from '../modelo/logindto';
import { Observable } from 'rxjs';
import { RegistroPacienteDTO } from '../modelo/Paciente/registro-paciente-dto';
import { RegistroMedicoDTO } from '../modelo/Admin/registro-medico-dto';
import { JwtDto } from '../modelo/jwt-dto';
import {ItemMedicoDTO} from "../modelo/item-medico-dto";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  refresh(jwt: JwtDto) {
    throw new Error('Method not implemented.');
  }
  private authURL = "http://localhost:8080/api/admins";
  constructor(private http: HttpClient) { }

  public crearMedico(medico: RegistroMedicoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/crearMedico`, medico);
  }
  public obtenerMedico(codigo: number): Observable<ItemMedicoDTO> {
    return this.http.get<ItemMedicoDTO>(`${this.authURL}/obtenerMedico/${codigo}`);
  }
}
