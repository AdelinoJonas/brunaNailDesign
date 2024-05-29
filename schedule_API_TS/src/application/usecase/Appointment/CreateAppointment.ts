import Appointment from "../../../domain/Appointment";
import AppointmentRepository from "../../repository/AppointmentRepository";

export default class CreateAppointment {
  constructor ( readonly appointmentRepository: AppointmentRepository) {
  }

  async execute (input: Input): Promise<Output> {
    const appointment = Appointment.create(	
      input.user_id,
      input.service_id,
      input.schedule_id
    );
    const appointmentId = await this.appointmentRepository.save(appointment);  
    return {appointment_id: appointmentId};
  }
}

type Input = {
  user_id: string, 
  service_id: string,
  schedule_id: string
}

type Output = {
  appointment_id: any
}