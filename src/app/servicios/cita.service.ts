import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  getCitas(): any[] {
    throw new Error('Method not implemented.');
  }
  citas: any[] = [];

  constructor() {
    this.citas.push({ codigo: 1, motivo: 'Control de rutina', fecha: '2023-10-12', seleccionada: false });
    this.citas.push({ codigo: 2, motivo: 'Consulta médica', fecha: '2023-09-29', seleccionada: false });
    this.citas.push({ codigo: 3, motivo: 'Examen de laboratorio', fecha: '2023-11-01', seleccionada: false });
    this.citas.push({ codigo: 4, motivo: 'Seguimiento de tratamiento', fecha: '2023-09-07', seleccionada: false });
  }

  public listar(): any[] {
    return this.citas;
  }

  public seleccionarCita(cita: any) {
    // Desmarca todas las citas
    this.citas.forEach(c => (c.seleccionada = false));
    // Marca la cita seleccionada
    cita.seleccionada = true;
  }
}
