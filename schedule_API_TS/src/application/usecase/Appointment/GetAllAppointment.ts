import AppointmentRepository from "../../repository/AppointmentRepository";

export default class GetAllAppointment {
  constructor (readonly appointmentRepository: AppointmentRepository) {
  }
  
  async execute (): Promise<Output[]> {
    const appointments = await this.appointmentRepository.getAllAppointment();
    const output: Output[] = appointments.map( appointment => ({
      user_id: appointment.user_id, 
      service_id: appointment.service_id,
      schedule_id: appointment.schedule_id,
    }));
    return output;
  }
}

type Output = {
  user_id: string, 
  service_id: string,
  schedule_id: string
}