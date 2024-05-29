import ServiceRepository from "../../repository/ServiceRepository";

export default class GetAllServices {
  constructor (readonly serviceRepository: ServiceRepository) {
  }
  
  async execute (): Promise<Output[]> {
    const services = await this.serviceRepository.getAllServices();
    const output: Output[] = services.map(service => ({
      title: service.title,
      price: service.price, 
      duration: service.duration, 
      description: service.description, 
      image_url: service.image_url, 
      is_course: service.is_course
    }));

    return output;
  }
}

type Output = {
  title: string,
  price: string, 
  duration: string, 
  description: string, 
  image_url: string, 
  is_course: boolean
}