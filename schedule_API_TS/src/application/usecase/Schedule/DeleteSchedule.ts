import ScheduleRepository from "../../repository/ScheduleRepository";

export default class DeleteSchedule {
  constructor (readonly scheduleRepository: ScheduleRepository) {
  }
  
  async execute (input: Input): Promise<Output> {
    const schedule = await this.scheduleRepository.delete(input.scheduleId);
    return schedule;
  }
}

type Input = {
  scheduleId: string,
}

type Output = {
  message: string,
}