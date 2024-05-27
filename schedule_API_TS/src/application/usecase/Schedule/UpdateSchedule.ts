import Schedule from "../../../domain/Schedule";
import ScheduleRepository from "../../repository/ScheduleRepository";

export default class UpdateSchedule {
  constructor(readonly scheduleRepository: ScheduleRepository) {}

  async execute(input: { scheduleId: string; data: any }): Promise<Schedule> {
    const existingSchedule = await this.scheduleRepository.get(input.scheduleId);
    if (!existingSchedule) {
      throw new Error("Schedule not found");
    }
    const updatedSchedule = { ...existingSchedule, ...input.data };
    const data = await this.scheduleRepository.update(input.scheduleId, updatedSchedule);
    return {
      available_day: data.available_day, 
      start_time: data.start_time,
      end_time: data.end_time
    };
  }
}
