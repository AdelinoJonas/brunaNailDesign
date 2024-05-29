
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
      end_time: scheduleData.end_time,
      is_free: scheduleData.is_free
    };
  }

  async getAllSchedules(): Promise<Schedule[]> {
    const serviceData = await knex('schedules').select('*');
    const schedules: Schedule[] = serviceData.map(data => ({
      scheduleId: data.schedule_id,
      available_day: data.available_day,
      start_time: data.start_time,
      end_time: data.end_time,
      is_free: data.is_free
    }));
console.log(schedules);

    return schedules;
  }
  
  async update(scheduleId: string, schedule: Partial<Schedule>) {
    const { available_day, start_time, end_time } = schedule;
    await knex('schedules')
      .where('schedule_id', scheduleId)
      .update({
        available_day, 
        start_time,
        end_time,
        is_free: false
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