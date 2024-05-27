import AppointmentRepository from "../../repository/AppointmentRepository";

export default class GetAppointment {
  constructor (readonly appointmentRepository: AppointmentRepository) {
  }
  
  async execute (input: Input): Promise<Output> {
    const appointment = await this.appointmentRepository.get(input.appointmentId);
    return {
      appointmentId: appointment.appointment_id,
      user_id: appointment.user_id, 
      service_id: appointment.service_id,
      schedule_id: appointment.schedule_id,
    }
  }
}

type Input = {
  appointmentId: string,
}

type Output = {
  appointmentId: string,
  user_id: string, 
  service_id: string,
  schedule_id: string
}