import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { LoginDTO } from '../modelo/logindto';
import { Observable } from 'rxjs';
import { RegistroPacienteDTO } from '../modelo/Paciente/registro-paciente-dto';
import { JwtDto } from '../modelo/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  refresh(jwt: JwtDto) {
    throw new Error('Method not implemented.');
  }
  private authURL = "http://localhost:8080/api/auth";
  constructor(private http: HttpClient) { }

  public registrar(paciente: RegistroPacienteDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/registrar`, paciente);
  }

  public login(loginDTO: LoginDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/login`, loginDTO);
  }
}
