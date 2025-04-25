export interface Cliente {
  nombre: string;
  telefono: string;
  email: string;
}

export interface Mascota {
  nombre: string;
  tipo: string;
  edad: string;
}

export interface Cita {
  id?: number;
  cliente: Cliente;
  mascota: Mascota;
  descripcion: string;
  estado: string;
  fechaHora: string;
}