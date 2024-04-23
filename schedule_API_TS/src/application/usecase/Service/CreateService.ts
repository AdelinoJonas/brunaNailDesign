import Service from "../../../domain/Service";
import ServiceRepository from "../../repository/ServiceRepository";

export default class CreateService {
  constructor ( readonly serviceRepository: ServiceRepository) {
  }

  async execute (input: Input): Promise<Output> {
    const service = Service.create(	
      input.title,
      input.price,
      input.duration,
      input.description,
      input.image,
      input.is_course
    );
    const serviceId = await this.serviceRepository.save(service);  
    return {service_id: serviceId};
  }
}

type Input = {
  title: string,
  price: string,
  duration: string,
  description: string,
  image: string,
  is_course: boolean
}

type Output = {
  service_id: any
}