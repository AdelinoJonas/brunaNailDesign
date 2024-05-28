import Service from "../../../domain/Service";
import ServiceRepository from "../../repository/ServiceRepository";

export default class UpdateService {
  constructor(readonly serviceRepository: ServiceRepository) {}

  async execute(input: { serviceId: string; data: any }): Promise<Service> {
    const existingService = await this.serviceRepository.get(input.serviceId);
    if (!existingService) {
      throw new Error("Service not found");
    }
    const updatedService = { ...existingService, ...input.data };
    const data = await this.serviceRepository.update(input.serviceId, updatedService);
    return {
      title: data.title,
      price: data.price, 
      duration: data.duration, 
      description: data.description, 
      image_url: data.image, 
      is_course: data.is_course
    };
  }
}
