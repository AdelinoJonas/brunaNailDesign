import CreateAppointment from "../../src/application/usecase/Appointment/CreateAppointment";
import DeleteAppointment from "../../src/application/usecase/Appointment/DeleteAppointment";
import GetAllAppointment from "../../src/application/usecase/Appointment/GetAllAppointments";
import GetAppointment from "../../src/application/usecase/Appointment/GetAppointment";
import UpdateAppointment from "../../src/application/usecase/Appointment/UpdateAppointment";
import AppointmentRepositoryDataBase from "../../src/infra/repository/AppointmentRepositoryDataBase";

test("Deve cadastrar um agendamento", async function () {
	const input = {
    user_id: "1",
    service_id: "1",
    schedule_id: "1",
	};
	const useCase = new CreateAppointment(new AppointmentRepositoryDataBase());
	const output = await useCase.execute(input);
	const output1 = output.appointment_id;
	expect(output1).toBeDefined();
});

test("Deve obter um appointment", async function() {
	const input = {
    user_id: "1",
    service_id: "1",
    schedule_id: "1",
	};
	const useCase = new CreateAppointment(new AppointmentRepositoryDataBase());
  const output = await useCase.execute(input); 
  const usecase1 = new GetAppointment(new AppointmentRepositoryDataBase());
  const output1 = await usecase1.execute({appointmentId: output.appointment_id}); 
	expect(output1.user_id).toBe("1");
	expect(output1.service_id).toBe("1");
	expect(output1.schedule_id).toBe("1");
})

test("Deve obter todos os appointments", async function() {
	const input = {
    user_id: "5",
    service_id: "7",
    schedule_id: "85",
	};
	const useCase = new CreateAppointment(new AppointmentRepositoryDataBase());
  await useCase.execute(input); 
  const usecase1 = new GetAllAppointment(new AppointmentRepositoryDataBase());
  const output1 = await usecase1.execute(); 
  expect(output1.length).toBeDefined();
})


test("Deve editar um appointment", async function() {
	const input = {
    user_id: "1",
    service_id: "1",
    schedule_id: "1",
	};
	const inputUpdated = {
    user_id: "2",
    service_id: "1",
    schedule_id: "1",
	};
	const useCase = new CreateAppointment(new AppointmentRepositoryDataBase());
	const output = await useCase.execute(input); 
	const usecase1 = new  UpdateAppointment(new AppointmentRepositoryDataBase());
	const output1 = await usecase1.execute({appointmentId:output.appointment_id, data:inputUpdated}); 
	expect(output1.user_id).toBe("2");
	expect(output1.service_id).toBe("1");
	expect(output1.schedule_id).toBe("1");
})

test('Deve deletar um appointment existente', async () => {
	const input = {
    user_id: "1",
    service_id: "1",
    schedule_id: "1",
	};
	const useCase = new CreateAppointment(new AppointmentRepositoryDataBase());
  const output = await useCase.execute(input); 
  const usecase1 = new DeleteAppointment(new AppointmentRepositoryDataBase());
  const output1 = await usecase1.execute({appointmentId: output.appointment_id});
	const deletedAppointment = output1.message;
	expect(deletedAppointment).toBe("Appointment deleted successfully");
});