import ServiceRepository from "../../repository/ServiceRepository";

export default class DeleteService {
  constructor (readonly serviceRepository: ServiceRepository) {
  }
  
  async execute (input: Input): Promise<Output> {
    const service = await this.serviceRepository.delete(input.serviceId);
    return service;
  }
}

type Input = {
  serviceId: string,
}

type Output = {
  message: string,
}