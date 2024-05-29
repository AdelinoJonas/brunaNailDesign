import Service from "../../domain/Service";

export default interface ServiceRepository {
  save(service: Service): Promise<any>;
  get(serviceId: string): Promise<any>;
  getAllServices(): Promise<Service[]>;
  update(serviceId: string, service: any): Promise<any>;
  delete(serviceId: string): Promise<any>;
}