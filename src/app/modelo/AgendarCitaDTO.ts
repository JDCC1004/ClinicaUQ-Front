export class AgendarCitaDTO {
    codigoPaciente!: number;
    especialidad: string = "";
    codigoMedico!: number;
    horario: Date | String = "";
    motivo: string = "";
}
