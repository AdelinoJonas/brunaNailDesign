import Schedule from "../../domain/Schedule";

export default interface ScheduleRepository {
  save(schedule: Schedule): Promise<any>;
  get(scheduleId: string): Promise<any>;
  getAllSchedules(): Promise<Schedule[]>;
  update(scheduleId: string, schedule: any): Promise<any>;
  delete(scheduleId: string): Promise<any>;
}