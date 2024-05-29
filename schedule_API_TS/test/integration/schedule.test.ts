import CreateSchedule from "../../src/application/usecase/Schedule/CreateShedule";
import DeleteSchedule from "../../src/application/usecase/Schedule/DeleteSchedule";
import GetSchedule from "../../src/application/usecase/Schedule/GetSchedule";
import UpdateSchedule from "../../src/application/usecase/Schedule/UpdateSchedule";
import ScheduleRepositoryDataBase from "../../src/infra/repository/ScheduleRepositoryDataBase";

test("Deve cadastrar um horário", async function () {
	const input = {
		available_day: "Segunda-feira",
		start_time: "09:00",
		end_time: "11:00",
		is_free: false
	};
	const useCase = new CreateSchedule(new ScheduleRepositoryDataBase());
	const output = await useCase.execute(input);
	const output1 = output.scheduleId;
	expect(output1).toBeDefined();
});

test("Deve obter um schedule", async function() {
	const input = {
		available_day: "Segunda-feira",
		start_time: "08:00",
		end_time: "10:00",
		is_free: false
	};
	const useCase = new CreateSchedule(new ScheduleRepositoryDataBase());
  const output = await useCase.execute(input); 
  const usecase1 = new GetSchedule(new ScheduleRepositoryDataBase());
  const output1 = await usecase1.execute({scheduleId: output.scheduleId}); 
	expect(output1.available_day).toBe("Segunda-feira");
	expect(output1.start_time).toBe("08:00:00");
	expect(output1.end_time).toBe("10:00:00");
})

test("Deve editar um schedule", async function() {
	const input = {
		available_day: "Segunda-feira",
		start_time: "08:00",
		end_time: "10:00",
		is_free: false
	};
	const inputUpdated = {
		available_day: "Segunda-feira",
		start_time: "14:00",
		end_time: "15:30",
		is_free: true
	};
	const useCase = new CreateSchedule(new ScheduleRepositoryDataBase());
	const output = await useCase.execute(input); 
	const usecase1 = new  UpdateSchedule(new ScheduleRepositoryDataBase());
	const output1 = await usecase1.execute({scheduleId:output.scheduleId, data:inputUpdated}); 
	expect(output1.available_day).toBe("Segunda-feira");
	expect(output1.start_time).toBe("14:00");
	expect(output1.end_time).toBe("15:30"
  );
})

test('Deve deletar um schedule existente', async () => {
	const input = {
		available_day: "Segunda-feira",
		start_time: "14:00",
		end_time: "15:30",
		is_free: false
	};
	const useCase = new CreateSchedule(new ScheduleRepositoryDataBase());
  const output = await useCase.execute(input); 
  const usecase1 = new DeleteSchedule(new ScheduleRepositoryDataBase());
  const output1 = await usecase1.execute({scheduleId: output.scheduleId});
	const deletedSchedule = output1.message;
	expect(deletedSchedule).toBe("Schedule deleted successfully");
});