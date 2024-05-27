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
      end_time: schedule.end_time
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
  end_time: string
}