import ServiceRepository from "../../repository/ServiceRepository";

export default class GetService {
  constructor (readonly serviceRepository: ServiceRepository) {
  }
  
  async execute (input: Input): Promise<Output> {
    const service = await this.serviceRepository.get(input.serviceId);
    
    return {
      serviceId: service.service_id,
      title: service.title,
      price: service.price, 
      duration: service.duration, 
      description: service.description, 
      image: service.image, 
      is_course: service.is_course
    }
  }
}

type Input = {
  serviceId: string,
}

type Output = {
  serviceId: string,
  title: string,
  price: string, 
  duration: string, 
  description: string, 
  image: string, 
  is_course: boolean
}