import AppointmentRepository from "../../repository/AppointmentRepository";

export default class DeleteAppointment {
  constructor (readonly appointmentRepository: AppointmentRepository) {
  }
  
  async execute (input: Input): Promise<Output> {
    const appointment = await this.appointmentRepository.delete(input.appointmentId);
    return appointment;
  }
}

type Input = {
  appointmentId: string,
}

type Output = {
  message: string,
}