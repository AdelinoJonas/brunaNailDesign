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
    const scheduleData = await this.scheduleRepository.save(schedule);  
    return {
      scheduleId: scheduleData.scheduleId,
      available_day: scheduleData.available_day, 
      start_time: scheduleData.start_time,
      end_time: scheduleData.end_time
    };
  }
}

type Input = {
  available_day: string, 
  start_time: string,
  end_time: string
}

type Output = {
  scheduleId: string,
  available_day: string, 
  start_time: string,
  end_time: string
}