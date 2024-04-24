import axios from "axios";
test('Deve realizar o login', async () => {
  const input = {
    email: "brunapereira@studio.com.br",
    password: "Bruna24"
  };
	const response = await axios.post("http://localhost:3000/login", input);	
	expect(response.status).toBe(200);
	expect(response.data.user).toBeDefined();
	expect(response.data.token).toBeDefined();
});

test("Deve cadastrar um usuário", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		phone: "41984498900",
    password: "Bruna24",
	};
	const response1 = await axios.post("http://localhost:3000/user", input);
	const output1 = response1.data;
	expect(output1).toBeDefined();
});

test("Deve obter um usuário", async function() {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		phone: "41984498900",
    password: "Bruna24",
	};
	const response1 = await axios.post("http://localhost:3000/user", input);
	const outputCreateUser = response1.data.user_id;
	const response2 = await axios.get(`http://localhost:3000/user/${outputCreateUser}`);
	const outputGetUser = response2.data;
	expect(outputGetUser.name).toBe("John Doe")
	expect(outputGetUser.email).toBe("john.doe@gmail.com")
	expect(outputGetUser.phone).toBe("41984498900")
})

test("Deve editar um usuário", async function() {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		phone: "41984498900",
		password: "Bruna24",
};
const inputUpdated = {
		name: "Joana Darc",
		email: "joana.dark@gmail.com",
		phone: "41984494689",
		password: "Joana32",
};
const responseCreate = await axios.post("http://localhost:3000/user", input);
const userId = responseCreate.data.user_id;
const responseUpdate = await axios.patch(`http://localhost:3000/user/${userId}`, inputUpdated);
const output = responseUpdate.data;
expect(output.name).toBe("Joana Darc");
expect(output.email).toBe("joana.dark@gmail.com");
expect(output.phone).toBe("41984494689");
})

test('Deve deletar um usuário existente', async () => {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		phone: "41984498900",
    password: "Bruna24",
	};
	const response1 = await axios.post("http://localhost:3000/user", input);
	const outputCreateUser = response1.data;
	const response2 = await axios.delete(`http://localhost:3000/user/${outputCreateUser}`);
	const deletedUser = response2.data.message;
	expect(deletedUser).toBe("User deleted successfully");
});

test("Deve cadastrar um Serviço", async function () {
	const input = {
		title: "Unha Gel",
    price: "190,00",
    duration:"1:30",
    description:"Aplicar unhas em gel com profissionalismo: Domine as etapas essenciais, desde a preparação das unhas até a finalização com estilo.Criar designs incríveis. Inicie ou aprimore sua carreira na área de beleza.Seja iniciante ou experiente.",
    image:"https://pngtree.com/freepng/beautifully-manicured-hands-featuring-natural-nails-with-gel-polish_14113158.html",
    is_course: true
	};
	const response1 = await axios.post("http://localhost:3000/service", input);
	const output1 = response1.data;
	expect(output1).toBeDefined();
});

test("Deve obter um serviço", async function() {
	const input = {
		title: "Unha Gel",
    price: "190,00",
    duration:"1:30",
    description:"Aplicar unhas em gel com profissionalismo: Domine as etapas essenciais, desde a preparação das unhas até a finalização com estilo.Criar designs incríveis. Inicie ou aprimore sua carreira na área de beleza.Seja iniciante ou experiente.",
    image:"https://pngtree.com/freepng/beautifully-manicured-hands-featuring-natural-nails-with-gel-polish_14113158.html",
    is_course: true
	};
	const response1 = await axios.post("http://localhost:3000/service", input);
	const outputCreateService = response1.data.service_id;
	const response2 = await axios.get(`http://localhost:3000/service/${outputCreateService}`);
	const outputGetService = response2.data;
	expect(outputGetService.title).toBe("Unha Gel");
	expect(outputGetService.price).toBe("190,00");
	expect(outputGetService.duration).toBe("1:30");
	expect(outputGetService.description).toBe("Aplicar unhas em gel com profissionalismo: Domine as etapas essenciais, desde a preparação das unhas até a finalização com estilo.Criar designs incríveis. Inicie ou aprimore sua carreira na área de beleza.Seja iniciante ou experiente.");
	expect(outputGetService.image).toBe("https://pngtree.com/freepng/beautifully-manicured-hands-featuring-natural-nails-with-gel-polish_14113158.html");
	expect(outputGetService.is_course).toBeTruthy();
})

test("Deve editar um serviço", async function() {
	const input = {
		title: "Unha Gel",
    price: "190,00",
    duration:"1:30",
    description:"Aplicar unhas em gel com profissionalismo: Domine as etapas essenciais, desde a preparação das unhas até a finalização com estilo.Criar designs incríveis. Inicie ou aprimore sua carreira na área de beleza.Seja iniciante ou experiente.",
    image:"https://pngtree.com/freepng/beautifully-manicured-hands-featuring-natural-nails-with-gel-polish_14113158.html",
    is_course: true
	};
	const inputUpdated = {
		title: "Unha Gel com desenho",
    price: "190,00",
    duration:"1:30",
    description:"MOdelo lindo.",
    image:"https://pngtree.com/freepng/beautifully-manicured-hands-featuring-natural-nails-with-gel-polish_14113158.html",
    is_course: false
	};
const responseCreate = await axios.post("http://localhost:3000/service", input);
const serviceId = responseCreate.data.service_id;
const responseUpdate = await axios.patch(`http://localhost:3000/service/${serviceId}`, inputUpdated);
const output = responseUpdate.data;
expect(output.title).toBe("Unha Gel com desenho");
expect(output.price).toBe("190,00");
expect(output.duration).toBe("1:30");
expect(output.description).toBe("MOdelo lindo.");
expect(output.image).toBe("https://pngtree.com/freepng/beautifully-manicured-hands-featuring-natural-nails-with-gel-polish_14113158.html");
expect(output.is_course).toBeFalsy();
})

test('Deve deletar um serviço existente', async () => {
	const input = {
		title: "Unha Gel",
    price: "190,00",
    duration:"1:30",
    description:"Aplicar unhas em gel com profissionalismo: Domine as etapas essenciais, desde a preparação das unhas até a finalização com estilo.Criar designs incríveis. Inicie ou aprimore sua carreira na área de beleza.Seja iniciante ou experiente.",
    image:"https://pngtree.com/freepng/beautifully-manicured-hands-featuring-natural-nails-with-gel-polish_14113158.html",
    is_course: true
	};
	const response1 = await axios.post("http://localhost:3000/service", input);
	const outputCreateService = response1.data;
	const response2 = await axios.delete(`http://localhost:3000/service/${outputCreateService}`);
	const deletedService = response2.data.message;
	expect(deletedService).toBe("Service deleted successfully");
});

test("Deve cadastrar um horário", async function () {
	const input = {
		available_day: "Segunda-feira",
		start_time: "09:00",
		end_time: "11:00"
	};
	const response1 = await axios.post("http://localhost:3000/schedule", input);
	const output1 = response1.data;
	expect(output1).toBeDefined();
});

test("Deve obter um schedule", async function() {
	const input = {
		available_day: "Segunda-feira",
		start_time: "08:00",
		end_time: "10:00"
	};
	const response1 = await axios.post("http://localhost:3000/schedule", input);
  const outputCreateSchedule = response1.data.schedule_id;
	const response2 = await axios.get(`http://localhost:3000/schedule/${outputCreateSchedule}`);
	const output1 = response2.data;
	expect(output1.available_day).toBe("Segunda-feira");
	expect(output1.start_time).toBe("08:00:00");
	expect(output1.end_time).toBe("10:00:00");
})

test("Deve editar um schedule", async function() {
	const input = {
		available_day: "Segunda-feira",
		start_time: "08:00",
		end_time: "10:00"
	};
	const inputUpdated = {
		available_day: "Segunda-feira",
		start_time: "14:00",
		end_time: "15:30"
	};
	const responseCreate = await axios.post("http://localhost:3000/schedule", input);
	const scheduleId = responseCreate.data.schedule_id;
	const responseUpdate = await axios.patch(`http://localhost:3000/schedule/${scheduleId}`, inputUpdated);
	const output1 = responseUpdate.data;
	expect(output1.available_day).toBe("Segunda-feira");
	expect(output1.start_time).toBe("14:00");
	expect(output1.end_time).toBe("15:30"
  );
})

test('Deve deletar um schedule existente', async () => {
	const input = {
		available_day: "Segunda-feira",
		start_time: "14:00",
		end_time: "15:30"
	};
	const response1 = await axios.post("http://localhost:3000/schedule", input);
	const outputCreateSchedule = response1.data;
	const response2 = await axios.delete(`http://localhost:3000/schedule/${outputCreateSchedule}`);
	const deletedSchedule = response2.data.message;
	expect(deletedSchedule).toBe("Schedule deleted successfully");
});

test("Deve cadastrar um agendamento", async function () {
	const input = {
    user_id: "4",
    service_id: "1",
    schedule_id: "1",
	};
	const response1 = await axios.post("http://localhost:3000/appointment", input);
	const output1 = response1.data.appointment_id;
	expect(output1).toBeDefined();
});

test("Deve obter um appointment", async function() {
	const input = {
    user_id: "4",
    service_id: "1",
    schedule_id: "1",
	};
	const response1 = await axios.post("http://localhost:3000/appointment", input);
	const output_id = response1.data.appointment_id;
	const response2 = await axios.get(`http://localhost:3000/appointment/${output_id}`);
	const output1 = response2.data;
	expect(output1.user_id).toBe("4");
	expect(output1.service_id).toBe("1");
	expect(output1.schedule_id).toBe("1");
})

test("Deve editar um appointment", async function() {
	const input = {
    user_id: "4",
    service_id: "1",
    schedule_id: "1",
	};
	const inputUpdated = {
    user_id: "3",
    service_id: "1",
    schedule_id: "1",
	};
	const response1 = await axios.post("http://localhost:3000/appointment", input);
	const output_id = response1.data.appointment_id;
	const response2 = await axios.patch(`http://localhost:3000/appointment/${output_id}`, inputUpdated);
	const output1 = response2.data; 
	expect(output1.user_id).toBe("3");
	expect(output1.service_id).toBe("1");
	expect(output1.schedule_id).toBe("1");
})

test('Deve deletar um appointment existente', async () => {
	const input = {
    user_id: "4",
    service_id: "1",
    schedule_id: "1",
	};
	const response1 = await axios.post("http://localhost:3000/appointment", input);
	const output_id = response1.data.appointment_id;
	const response2 = await axios.delete(`http://localhost:3000/appointment/${output_id}`);
	const deletedAppointment = response2.data.message;
	expect(deletedAppointment).toBe("Appointment deleted successfully");
});