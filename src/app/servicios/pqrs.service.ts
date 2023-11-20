import { Injectable } from '@angular/core';
import { ItemPQRSDTO } from 'src/app/modelo/ItemPQRSDTO';
import { RegistroPQRSDTO } from 'src/app/modelo/registro-pqrs-dto';
import {Observable} from "rxjs";
import {MensajeDTO} from "../modelo/mensaje-dto";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class PqrsService {

  private clinicaURL = 'http://localhost:8081/api/PQRS';
  constructor(private http: HttpClient) {}

  public crear(pqrs: RegistroPQRSDTO): Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(
        `${this.clinicaURL}/crearPQR`,
        pqrs
    );
  }
  public verDetallePQRS(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
        `${this.clinicaURL}/verDetallePQRS/${codigo}`
    );
  }

  public listarPqrs(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clinicaURL}/listarPQRSPaciente`);
  }

  public listarPQRSPaciente(codigoPaciente: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
        `${this.clinicaURL}/listarPQRSPaciente/${codigoPaciente}`
    );
  }

}
