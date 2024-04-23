import service from "../../domain/Service";

export default interface ServiceRepository {
  save(service: service): Promise<any>;
  // get(serviceId: string): Promise<any>;
  // update(serviceId: string, service: any): Promise<any>;
  // delete(serviceId: string): Promise<any>;
}