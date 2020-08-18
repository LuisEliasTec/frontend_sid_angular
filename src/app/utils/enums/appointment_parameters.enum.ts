export enum APPOINTMENT_TYPE {
    VALORACION = 'Valoración',
    SEGUIMIENTO = 'Seguimiento'
};

export enum APPOINTMENT_MODALITY {
    PRESENCIAL = 'Presencial',
    ONLINE = 'Online'
};

export enum PROCEDURE_TYPE {
    TERAPIA = 'Terapia',
    CIRUGIA = 'Cirugía'
}

export enum STATUS_WAITINING_LIST {
    SIN_AGENDAR = 'Sin agendar',
    AGENDADA = 'Agendada',
    CANCELADA = 'Cancelada'
}

export enum STATUS_APPOINTMENT_SCHEDULE {
    PENDIENTE = 'Pendiente',
    ASISTIO = 'Asistió',
    NO_ASISTIO = 'No asistió',
    CANCELO = 'Canceló'
}
