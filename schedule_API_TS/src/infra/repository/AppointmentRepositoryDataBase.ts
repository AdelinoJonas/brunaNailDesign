import knex from '../../../knex';
import Appointment from '../../domain/Appointment';

export default class AppointmentRepositoryDataBase implements AppointmentRepositoryDataBase {

  async save (appointment: Appointment) {
    const { user_id, service_id, schedule_id } = appointment;
    const appointmentId = await knex('appointments').insert({
      user_id, 
      service_id, 
      schedule_id
    });   
    return (appointmentId[0]);
  }

  async get (appointmentId: string) {
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

  async delete (appointmentId: string) {
    await knex('appointments')
    .where('appointment_id', appointmentId)
    .del()
    return {message: "Appointment deleted successfully"}
  }
}