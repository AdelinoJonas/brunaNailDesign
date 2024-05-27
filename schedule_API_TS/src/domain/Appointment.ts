
export default class Appointment {

  constructor (
    readonly user_id: string,
    readonly service_id: string,
    readonly schedule_id: string ) {
  }

  static create( user_id: string, service_id: string, schedule_id: string ) {
    return new Appointment(user_id, service_id, schedule_id);
  }
}