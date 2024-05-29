import ScheduleRepository from "../../repository/ScheduleRepository";

export default class GetAllSchedules {
  constructor (readonly scheduleRepository: ScheduleRepository) {
  }
  
  async execute (): Promise<Output[]> {
    const schedules = await this.scheduleRepository.getAllSchedules();
    const output: Output[] = schedules.map(schedule => ({
      available_day: schedule.available_day, 
      start_time: schedule.start_time,
      end_time: schedule.end_time,
      is_free: schedule.is_free,
    }));
    return output;
  }
}

type Output = {
  available_day: string, 
  start_time: string,
  end_time: string,
  is_free: boolean
}