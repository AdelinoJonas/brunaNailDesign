
export default class Appointment {
    constructor(
      readonly service_id: string,
      readonly schedule_id: string,
      readonly user_id: string,
    ) {}
  
    static create(
      service_id: string,
      schedule_id: string,
      user_id: string,
    ) {
      return new Appointment(
        service_id,
        schedule_id,
        user_id,
      );
    }
  }