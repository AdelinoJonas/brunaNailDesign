
export default class Schedule {

  constructor (
    readonly available_day: string,
    readonly start_time: string,
    readonly end_time: string,
    readonly is_free: boolean,
   ) {
  }

  static create( available_day: string, start_time: string, end_time: string, is_free: boolean ) {
    return new Schedule(available_day, start_time, end_time, is_free);
  }
}