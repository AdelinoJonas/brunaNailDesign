import Appointment from "../../domain/Appointment";

export default interface AppointmentRepository {
  save(appointment: Appointment): Promise<any>;
  get(appointmentId: string): Promise<any>;
  getAllAppointment(): Promise<Appointment[]>;
  update(appointmentId: string, apointment: any): Promise<any>;
  delete(appointmentId: string): Promise<any>;
}