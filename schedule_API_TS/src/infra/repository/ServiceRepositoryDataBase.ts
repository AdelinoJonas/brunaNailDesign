import Service from "../../domain/Service";
import knex from '../../../knex';
import ServiceRepository from "../../application/repository/ServiceRepository";

export default class ServiceRepositoryDataBase implements ServiceRepository {

  async save (service: Service) {
    const { title, price, duration, description, image_url, is_course } = service;
    const serviceData = await knex('services').insert({
      title,
      price, 
      duration, 
      description, 
      image_url, 
      is_course
    });   
    return (serviceData[0]);
  }

  async get (serviceId: string) {
    const serviceData = await knex('services')
    .select()
    .where('service_id', serviceId)
    .first();
    return {
      serviceId: serviceData.service_id,
      title: serviceData.title,
      price: serviceData.price, 
      duration: serviceData.duration, 
      description: serviceData.description, 
      image_url: serviceData.image_url, 
      is_course: serviceData.is_course
    };
  }

  async update(serviceId: string, service: Partial<Service>) {
    const { title, price, duration, description, image_url , is_course } = service;
    await knex('services')
      .where('service_id', serviceId)
      .update({
        title,
        price, 
        duration, 
        description, 
        image_url, 
        is_course
      });
    return service;
  }

  async delete (serviceId: string) {
    await knex('services')
    .where('service_id', serviceId)
    .del()
    return {message: "Service deleted successfully"}
  }
}