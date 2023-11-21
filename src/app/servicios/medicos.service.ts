import { Injectable } from '@angular/core';
import {ItemMedicoDTO} from "../modelo/item-medico-dto";
import {RegistroMedicoDTO} from "../modelo/Admin/registro-medico-dto";
import {Observable} from "rxjs";
import {MensajeDTO} from "../modelo/mensaje-dto";
import {HttpClient} from "@angular/common/http";
import {DiaLibreDTO} from "../modelo/diaLibreDTO";


@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  private userUrl = "http://localhost:8080/api/medicos";

  medicos: ItemMedicoDTO[];

  constructor(private http: HttpClient) {
    this.medicos = [];

  }

  public listar(): ItemMedicoDTO[] {
    return this.medicos;
  }
  public obtenerMedico(codigo: number): ItemMedicoDTO | undefined{
    return this.medicos.find(medicos => medicos.codigo == codigo);
  }

  public crear(medicos: RegistroMedicoDTO){
    let codigo = this.medicos.length + 1;
    this.medicos.push({ codigo: codigo, cedula: medicos.cedula, nombre: medicos.nombre, especialidad: medicos.especialidad});
  }

  public verDetalleCitaAtendida(codigoMedico: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/citasPendientes/${codigoMedico}`);
  }

  public agendarDiaLibre(diaLibreDTO: DiaLibreDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userUrl}/agendarDiaLibre`, diaLibreDTO);
  }

  public verDetalleCita(codigoMedico: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/listar`);
  }

  public listarCitas(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/listar`);
  }

}
