import Appointment from "../../../domain/Appointment";
import AppointmentRepository from "../../repository/AppointmentRepository";

export default class UpdateAppointment {
  constructor(readonly appointmentRepository: AppointmentRepository) {}

  async execute(input: { appointmentId: string; data: any }): Promise<Appointment> {
    const existingAppointment = await this.appointmentRepository.get(input.appointmentId);
    if (!existingAppointment) {
      throw new Error("Appointment not found");
    }
    const updatedAppointment = { ...existingAppointment, ...input.data };
    const data = await this.appointmentRepository.update(input.appointmentId, updatedAppointment);
    return {
      user_id: data.user_id, 
      service_id: data.service_id,
      schedule_id: data.schedule_id,
    };
  }
}
