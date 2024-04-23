import knex from '../../../knex';
import Schedule from "../../domain/Schedule";

export default class ScheduleRepositoryDataBase implements ScheduleRepositoryDataBase {

  async save (schedule: Schedule) {
    const { available_day, start_time, end_time } = schedule;
    const scheduleId = await knex('schedules').insert({
      available_day, 
      start_time,
      end_time
    });   
    return (scheduleId[0]);
  }

  // async get (serviceId: string) {
  //   const serviceData = await knex('services')
  //   .select()
  //   .where('service_id', serviceId)
  //   .first();
  //   return {
  //     serviceId: serviceData.service_id,
  //     title: serviceData.title,
  //     price: serviceData.price, 
  //     duration: serviceData.duration, 
  //     description: serviceData.description, 
  //     image: serviceData.image, 
  //     is_course: serviceData.is_course
  //   };
  // }

  // async update(serviceId: string, service: Partial<Service>) {
  //   const { title, price, duration, description, image, is_course } = service;
  //   await knex('services')
  //     .where('service_id', serviceId)
  //     .update({
  //       title,
  //       price, 
  //       duration, 
  //       description, 
  //       image, 
  //       is_course
  //     });
  //   return service;
  // }

  // async delete (serviceId: string) {
  //   await knex('services')
  //   .where('service_id', serviceId)
  //   .del()
  //   return {message: "Service deleted successfully"}
  // }
}