
import knex from '../../../knex';
import Schedule from "../../domain/Schedule";

export default class ScheduleRepositoryDataBase implements ScheduleRepositoryDataBase {

  async save (schedule: Schedule) {
    const { available_day, start_time, end_time } = schedule;
    const [scheduleId] = await knex('schedules')
      .insert({ available_day, start_time, end_time });
    return ({ scheduleId });
  }

  async get(scheduleId: string) {
    const scheduleData = await knex('schedules')
      .select()
      .where('schedule_id', scheduleId)
      .first();
    if (!scheduleData) {
      throw new Error(`Schedule with ID ${scheduleId} not found`);
    }
    return {
      scheduleId: scheduleData.schedule_id,
      available_day: scheduleData.available_day,
      start_time: scheduleData.start_time,
      end_time: scheduleData.end_time
    };
  }
  
  async update(scheduleId: string, schedule: Partial<Schedule>) {
    const { available_day, start_time, end_time } = schedule;
    await knex('schedules')
      .where('schedule_id', scheduleId)
      .update({
        available_day, 
        start_time,
        end_time
      });
    return schedule;
  }

  async delete (scheduleId: string) {
    await knex('schedules')
    .where('schedule_id', scheduleId)
    .del()
    return {message: "Schedule deleted successfully"}
  }
}