import knex from '../../../knex';
import Appointment from '../../domain/Appointment';
import AppointmentRepository from '../../application/repository/AppointmentRepository';

export default class AppointmentRepositoryDataBase implements AppointmentRepository {

  async save(appointment: Appointment) {
    const { user_id, service_id, schedule_id } = appointment;
    const appointmentId = await knex('appointments').insert({
      user_id,
      service_id,
      schedule_id
    });
    return appointmentId[0];
  }

  async get(appointmentId: string) {
    const appointmentData = await knex('appointments')
      .select()
      .where('appointment_id', appointmentId)
      .first();
    return {
      appointmentId: appointmentData.appointment_id,
      user_id: appointmentData.user_id,
      service_id: appointmentData.service_id,
      schedule_id: appointmentData.schedule_id
    };
  }

  async getAllAppointment(): Promise<Appointment[]> {
    const appointmentData = await knex('schedules').select('*');
    const appointments: Appointment[] = appointmentData.map((data) =>
      Appointment.create(
        data.user_id,
        data.service_id,
        data.schedule_id,
      )
    );
    console.log(appointments);
    return appointments;
  }

  async update(appointmentId: string, appointment: Partial<Appointment>) {
    const { user_id, service_id, schedule_id } = appointment;
    await knex('appointments')
      .where('appointment_id', appointmentId)
      .update({
        user_id,
        service_id,
        schedule_id
      });
    return appointment;
  }

  async delete(appointmentId: string) {
    await knex('appointments')
      .where('appointment_id', appointmentId)
      .del()
    return { message: "Appointment deleted successfully" }
  }
}