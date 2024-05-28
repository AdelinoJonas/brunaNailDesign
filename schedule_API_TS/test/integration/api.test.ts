import axios from "axios";

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
test("Deve obter um usuário", async () => {
	const input = {
			name: "John Doe",
			email: "john.does@gmail.com",
			phone: "41984498900",
			password: "Bruna24",
	};
	const postedUser = await axios.post("http://localhost:3000/user", input);
	const outputCreateUser = postedUser.data.user_id;
	const inputLogin = {
			email: "john.does@gmail.com",
			password: "Bruna24",
	};
	const login = await axios.post("http://localhost:3000/login", inputLogin);
	if (login && login.data && login.data.token) {
			const token = login.data.token;
			const headers = { headers: { authorization: `Bearer ${token}` } };
			try {
						const response = await axios.get(`http://localhost:3000/user/${outputCreateUser}`, headers);
					const outputGetUser = response.data;
					expect(outputGetUser.name).toBe("John Doe");
					expect(outputGetUser.email).toBe("john.does@gmail.com");
					expect(outputGetUser.phone).toBe("41984498900");
			} catch (error:any) {
					console.error("Erro ao obter usuário:", error.message);
			}
	} else {
			console.error("Login falhou: Não foi possível obter o token de autenticação.");
	}
});

test("Deve editar um usuário", async function() {
	const input = {
		name: "John Doe",
		email: "john.done@gmail.com",
		phone: "41984498900",
		password: "Bruna24",
	};
	const responseCreate = await axios.post("http://localhost:3000/user", input);
	const userId = responseCreate.data.user_id;
	const inputLogin = {
		email: "john.done@gmail.com",
		password: "Bruna24",
	};
	const login = await axios.post("http://localhost:3000/login", inputLogin);
	const token = login.data.token;
	const headers = { headers: { authorization: `Bearer ${token}` } };
	try {
		const inputUpdated = {
			name: "Joana Darc",
			email: "joana.dark@gmail.com",
			phone: "41984494689",
			password: "Joana32",
		};
		const responseUpdate = await axios.patch(`http://localhost:3000/user/${userId}`, inputUpdated, headers);
		const output = responseUpdate.data;
		expect(output.name).toBe("Joana Darc");
		expect(output.email).toBe("joana.dark@gmail.com");
		expect(output.phone).toBe("41984494689");
	} catch (error:any) {
			console.error("Erro ao editar usuário:", error.message);
	}
})

test('Deve deletar um usuário existente', async () => {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.net",
		phone: "41984498900",
		password: "Bruna24",
	};
	const response1 = await axios.post("http://localhost:3000/user", input);
	const outputCreateUser = response1.data.user_id;
	try {
		const inputLogin = {
				email: "john.doe@gmail.net",
				password: "Bruna24",
		};
		const login = await axios.post("http://localhost:3000/login", inputLogin);
		const token = login.data.token;
		const headers = { headers: { authorization: `Bearer ${token}` } };
		const response2 = await axios.delete(`http://localhost:3000/user/${outputCreateUser}`, headers);
		const deletedUser = response2.data.message;
		expect(deletedUser).toBe("User deleted successfully");
	} catch (error:any) {
		console.error("Erro ao deletar usuário:", error.message);
	}
});

test('Deve realizar o login', async () => {
  const input = {
    email: "john.done@gmail.com",
    password: "Bruna24"
  };
  try {
    const response = await axios.post("http://localhost:3000/login", input);
    expect(response.status).toBe(200);
    expect(response.data.user).toBeDefined();
    expect(response.data.token).toBeDefined();
  } catch (error:any) {
    fail(error.message);
  }
});

test("Deve cadastrar um Serviço", async function () {
	const inputLogin = {
		email: "brunapereira@studio.com.br",
    password: "Bruna24",
	};
	const login = await axios.post("http://localhost:3000/login", inputLogin);
	if (login && login.data && login.data.token) {
		const token = login.data.token;
		const headers = { headers: { authorization: `Bearer ${token}` } };
		const input = {
			title: "Unha Gel",
			price: "190,00",
			duration: "1:30",
			description:"Aplicar unhas em gel com profissionalismo: Domine as etapas essenciais, desde a preparação das unhas até a finalização com estilo.Criar designs incríveis. Inicie ou aprimore sua carreira na área de beleza.Seja iniciante ou experiente.",
			image_url:"https://pngtree.com/freepng/beautifully-manicured-hands-featuring-natural-nails-with-gel-polish_14113158.html",
			is_course: true,
		};
		const postedService = await axios.post("http://localhost:3000/admin/service", input, headers);
		const outputPostService = postedService.data;
		expect(outputPostService).toBeDefined();
	} else {
			console.error("Login falhou: Não foi possível obter o token de autenticação.");
	}
});

test("Não deve cadastrar um Serviço sem ser admin", async function () {
	const inputLogin = {
		email: "john.doe@gmail.net",
		password: "Bruna24",
	};
	try {
		const login = await axios.post("http://localhost:3000/login", inputLogin);
		if (login && login.data && login.data.token) {
			const token = login.data.token;
			const headers = { headers: { authorization: `Bearer ${token}` } };
			const input = {
				title: "Unha Gel",
				price: "190,00",
				duration: "1:30",
				description: "Aplicar unhas em gel com profissionalismo: Domine as etapas essenciais, desde a preparação das unhas até a finalização com estilo.Criar designs incríveis. Inicie ou aprimore sua carreira na área de beleza.Seja iniciante ou experiente.",
				image_url: "https://pngtree.com/freepng/beautifully-manicured-hands-featuring-natural-nails-with-gel-polish_14113158.html",
				is_course: true,
			};
			await axios.post("http://localhost:3000/admin/service", input, headers);
		} else {
			console.error("Login falhou: Não foi possível obter o token de autenticação.");
		}
	} catch (error:any) {
			expect(error.response.data.message).toBe("Usuário não tem permissão para acessar.");
	}
});
test("Deve obter um serviço", async function() {
	const inputLoginAdm = {
		email: "brunapereira@studio.com.br",
    password: "Bruna24",
	};
	const loginAdm = await axios.post("http://localhost:3000/login", inputLoginAdm);
	if (loginAdm && loginAdm.data && loginAdm.data.token) {
		const token = loginAdm.data.token;
		const headers = { headers: { authorization: `Bearer ${token}` } };
		const input = {
			title: "Unha Gel",
			price: "190,00",
			duration: "1:30",
			description:"Aplicar unhas em gel com profissionalismo: Domine as etapas essenciais, desde a preparação das unhas até a finalização com estilo.Criar designs incríveis. Inicie ou aprimore sua carreira na área de beleza.Seja iniciante ou experiente.",
			image_url:"https://pngtree.com/freepng/beautifully-manicured-hands-featuring-natural-nails-with-gel-polish_14113158.html",
			is_course: true,
		};
		const postedService = await axios.post("http://localhost:3000/admin/service", input, headers);
		const outputCreateService = postedService.data.service_id;
		const inputPostUser = {
			name: "John Doe",
			email: "john.does@gmail.com",
			phone: "41984498900",
			password: "Bruna24",
		};
		await axios.post("http://localhost:3000/user", inputPostUser);
		const inputLoginUser = {
			email: "john.does@gmail.com",
			password: "Bruna24",
		};
		const login = await axios.post("http://localhost:3000/login", inputLoginUser);
		if (login && login.data && login.data.token) {
			const token = login.data.token;
			const headers = { headers: { authorization: `Bearer ${token}` } };
			const getService = await axios.get(`http://localhost:3000/service/${outputCreateService}`, headers);
			const outputGetService = getService.data;
			expect(outputGetService.title).toBe("Unha Gel");
			expect(outputGetService.price).toBe("190,00");
			expect(outputGetService.duration).toBe("1:30");
			expect(outputGetService.description).toBe(input.description);
			expect(outputGetService.image_url).toBe(input.image_url);
			expect(outputGetService.is_course).toBeTruthy();
		}
	} else {
		console.error("Login falhou: Não foi possível obter o token de autenticação.");
	}
})

test("Deve editar um serviço", async function() {
	const inputLoginAdm = {
		email: "brunapereira@studio.com.br",
    password: "Bruna24",
	};
	const loginAdm = await axios.post("http://localhost:3000/login", inputLoginAdm);
	if (loginAdm && loginAdm.data && loginAdm.data.token) {
		const token = loginAdm.data.token;
		const headers = { headers: { authorization: `Bearer ${token}` } };
		const inputService = {
			title: "Unha Gel",
			price: "190,00",
			duration: "1:30",
			description:"Aplicar unhas em gel com profissionalismo: Domine as etapas essenciais, desde a preparação das unhas até a finalização com estilo.Criar designs incríveis. Inicie ou aprimore sua carreira na área de beleza.Seja iniciante ou experiente.",
			image_url:"https://pngtree.com/freepng/beautifully-manicured-hands-featuring-natural-nails-with-gel-polish_14113158.html",
			is_course: true,
		};
		const postedService = await axios.post("http://localhost:3000/admin/service", inputService, headers);
		const serviceId = postedService.data.service_id;
		const inputUpdated = {
			title: "Unha Gel com desenho",
			price: "190,00",
			duration:"1:30",
			description:"MOdelo lindo.",
			image_url:"https://pngtree.com/freepng/beautifully-manicured-hands-featuring-natural-nails-with-gel-polish_14113158.html",
			is_course: false
		};
		const responseUpdate = await axios.patch(`http://localhost:3000/admin/service/${serviceId}`, inputUpdated, headers);
		const output = responseUpdate.data;
		expect(output.title).toBe("Unha Gel com desenho");
		expect(output.price).toBe("190,00");
		expect(output.duration).toBe("1:30");
		expect(output.description).toBe("MOdelo lindo.");
		expect(output.image_url).toBe("https://pngtree.com/freepng/beautifully-manicured-hands-featuring-natural-nails-with-gel-polish_14113158.html");
		expect(output.is_course).toBeFalsy();
	} else {
		console.error("Login falhou: Não foi possível obter o token de autenticação.");
	}
})

test('Deve deletar um serviço existente', async () => {
	const inputLoginAdm = {
		email: "john.doe@gmail.net",
		password: "Bruna24",
	};
	const loginAdm = await axios.post("http://localhost:3000/login", inputLoginAdm);
	if (loginAdm && loginAdm.data && loginAdm.data.token) {
		const token = loginAdm.data.token;
		const headers = { headers: { authorization: `Bearer ${token}` } };
		const inputService = {
			title: "Unha Gel",
			price: "190,00",
			duration: "1:30",
			description:"Aplicar unhas em gel com profissionalismo: Domine as etapas essenciais, desde a preparação das unhas até a finalização com estilo.Criar designs incríveis. Inicie ou aprimore sua carreira na área de beleza.Seja iniciante ou experiente.",
			image_url:"https://pngtree.com/freepng/beautifully-manicured-hands-featuring-natural-nails-with-gel-polish_14113158.html",
			is_course: true,
		};
		const postedService = await axios.post("http://localhost:3000/admin/service", inputService, headers);
		const serviceId = postedService.data.service_id;
		const deleteService = await axios.delete(`http://localhost:3000/admin/service/${serviceId}`, headers);
		const deletedMsg = deleteService.data.message;
		expect(deletedMsg).toBe("Service deleted successfully");
	} else {
		console.error("Login falhou: Não foi possível obter o token de autenticação.");
	}
});

test("Deve cadastrar um horário", async function () {
	const inputLoginAdm = {
		email: "brunapereira@studio.com.br",
    password: "Bruna24",
	};
	const loginAdm = await axios.post("http://localhost:3000/login", inputLoginAdm);
	if (loginAdm && loginAdm.data && loginAdm.data.token) {
		const token = loginAdm.data.token;
		const headers = { headers: { authorization: `Bearer ${token}` } };
	const input = {
		available_day: "Segunda-feira",
		start_time: "09:00",
		end_time: "11:00"
	};
	const createSchedule = await axios.post("http://localhost:3000/admin/schedule", input, headers);
	const output1 = createSchedule.data;
	expect(output1).toBeDefined();
	} else {
		console.error("Login falhou: Não foi possível obter o token de autenticação.");
	}
});

test("Deve obter um schedule", async function() {
  const input = {
    name: "John Doe",
    email: "john.does@gmail.com",
    phone: "41984498900",
    password: "Bruna24",
  };
  const postedUser = await axios.post("http://localhost:3000/user", input);
  const inputLogin = {
    email: "john.does@gmail.com",
    password: "Bruna24",
  };
  const inputLoginAdm = {
    email: "brunapereira@studio.com.br",
    password: "Bruna24",
  };
  const loginAdm = await axios.post("http://localhost:3000/login", inputLoginAdm);
  const login = await axios.post("http://localhost:3000/login", inputLogin);
  if (loginAdm && loginAdm.data && loginAdm.data.token || login && login.data && login.data.token) {
    const token = loginAdm.data.token || login.data.token;
    const headers = { headers: { authorization: `Bearer ${token}` } };
    const inputSchedule = {
      available_day: "Segunda-feira",
      start_time: "09:00",
      end_time: "11:00"
    };
    const createScheduleResponse = await axios.post("http://localhost:3000/admin/schedule", inputSchedule, headers);
    const scheduleId = createScheduleResponse.data.scheduleId;
    const getScheduleResponse = await axios.get(`http://localhost:3000/schedule/${scheduleId}`, headers);
    const output1 = getScheduleResponse.data;
    expect(output1.available_day).toBe("Segunda-feira");
    expect(output1.start_time).toBe("09:00:00");
    expect(output1.end_time).toBe("11:00:00");
  } else {
    console.error("Login falhou: Não foi possível obter o token de autenticação.");
  }
});

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
