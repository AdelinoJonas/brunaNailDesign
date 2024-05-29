import ScheduleRepository from "../../repository/ScheduleRepository";

export default class GetSchedule {
  constructor (readonly scheduleRepository: ScheduleRepository) {
  }
  
  async execute (input: Input): Promise<Output> {
    const schedule = await this.scheduleRepository.get(input.scheduleId);
    return {
      scheduleId: schedule.schedule_id,
      available_day: schedule.available_day, 
      start_time: schedule.start_time,
      end_time: schedule.end_time,
      is_free: schedule.is_free,
    }
  }
}

type Input = {
  scheduleId: string,
}

type Output = {
  scheduleId: string,
  available_day: string, 
  start_time: string,
  end_time: string,
  is_free: boolean
}