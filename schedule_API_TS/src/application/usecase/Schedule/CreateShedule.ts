import Schedule from "../../../domain/Schedule";
import ScheduleRepository from "../../repository/ScheduleRepository";

export default class CreateSchedule {
  constructor ( readonly scheduleRepository: ScheduleRepository) {
  }

  async execute (input: Input): Promise<Output> {
    const schedule = Schedule.create(	
      input.available_day, 
      input.start_time,
      input.end_time
    );
    const scheduleId = await this.scheduleRepository.save(schedule);  
    return {schedule_id: scheduleId};
  }
}

type Input = {
  available_day: string, 
  start_time: string,
  end_time: string
}

type Output = {
  schedule_id: any
}