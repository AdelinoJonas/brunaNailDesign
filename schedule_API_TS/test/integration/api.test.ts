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
		const response = await axios.get(`http://localhost:3000/user/${outputCreateUser}`,headers);
		const outputGetUser = response.data;
		expect(outputGetUser.name).toBe("John Doe");
		expect(outputGetUser.email).toBe("john.does@gmail.com");
		expect(outputGetUser.phone).toBe("41984498900");
	} else {
		console.error("Login falhou: Não foi possível obter o token de autenticação.");
	}
});

test("Deve obter todos os usuários", async () => {
  try {
    const inputLogin = {
      email: "brunapereira@studio.com.br",
      password: "Bruna24",
    };
    const login = await axios.post("http://localhost:3000/login", inputLogin);
    const token = login.data.token;
	console.log(login.data);
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get("http://localhost:3000/admin/users", headers);
    const outputGetUsers = response.data;
		expect(outputGetUsers.length).toBeDefined();
  } catch (error:any) {
    console.error("Erro ao obter usuários:", error.message);
  }
});

test("Deve editar um usuário", async function() {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		phone: "41984498900",
        password: "Bruna24",
	};
	const createdUser = await axios.post("http://localhost:3000/user", input);
	const inputLogin = {
		email: "brunapereira@studio.com.br",
		password: "Bruna24",
	};
	const login = await axios.post("http://localhost:3000/login", inputLogin);
	const token = login.data.token;
	const headers = { headers: { Authorization: `Bearer ${token}` } };
	const inputUpdated = {
		name: "Joana Darc",
		email: "joana.dark@gmail.com",
		phone: "41984494689",
		password: "Joana32",
		is_active: false
	};
	const responseUpdate = await axios.patch(`http://localhost:3000/admin/user/${createdUser.data.user_id}`, inputUpdated, headers);
	const output = responseUpdate.data;
	expect(output.name).toBe("Joana Darc");
	expect(output.email).toBe("joana.dark@gmail.com");
	expect(output.phone).toBe("41984494689");
	expect(output.is_active).toBe(false);
})

test('Deve realizar o login', async () => {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.net",
		phone: "41984498900",
		password: "Bruna24",
	};
	await axios.post("http://localhost:3000/user", input);
  const inputLogin = {
    email: "john.doe@gmail.net",
    password: "Bruna24"
  };
	const response = await axios.post("http://localhost:3000/login", inputLogin);
	expect(response.status).toBe(200);
	expect(response.data.user).toBeDefined();
	expect(response.data.token).toBeDefined();
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

test("Deve obter todos os serviços", async () => {
	try {
	  const inputLogin = {
		email: "john.does@gmail.com",
		password: "Bruna24",
	  };
	  const login = await axios.post("http://localhost:3000/login", inputLogin);
	  const token = login.data.token;
	  const headers = { headers: { authorization: `Bearer ${token}` } };
	  const response = await axios.get("http://localhost:3000/services", headers);
	  const outputGetServices = response.data;
		  expect(outputGetServices.length).toBeDefined();
	} catch (error:any) {
	  console.error("Erro ao obter usuários:", error.message);
	}
  });

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

test("Não deve editar um Serviço sem ser admin", async function () {
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
      description: "Aplicar unhas em gel com profissionalismo: Domine as etapas essenciais, desde a preparação das unhas até a finalização com estilo. Criar designs incríveis. Inicie ou aprimore sua carreira na área de beleza. Seja iniciante ou experiente.",
      image_url: "https://pngtree.com/freepng/beautifully-manicured-hands-featuring-natural-nails-with-gel-polish_14113158.html",
      is_course: true,
    };
    const postedService = await axios.post("http://localhost:3000/admin/service", input, headers);
    const serviceId = postedService.data.service_id;
    const inputUser = {
      name: "John Doe",
      email: "john.does@gmail.com",
      phone: "41984498900",
      password: "Bruna24",
    };
    await axios.post("http://localhost:3000/user", inputUser);
    const inputLogin = {
      email: "john.does@gmail.com",
      password: "Bruna24",
    };
    try {
      const login = await axios.post("http://localhost:3000/login", inputLogin);
      
      if (login && login.data && login.data.token) {
        const userToken = login.data.token;
        const headersUser = { headers: { authorization: `Bearer ${userToken}` } };
        const inputUpdated = {
          title: "Unha Gel com desenho",
          price: "190,00",
          duration: "1:30",
          description: "Modelo lindo.",
          image_url: "https://pngtree.com/freepng/beautifully-manicured-hands-featuring-natural-nails-with-gel-polish_14113158.html",
          is_course: false,
        };
        await axios.patch(`http://localhost:3000/admin/service/${serviceId}`, inputUpdated, headersUser);
        throw new Error("O usuário não-admin conseguiu editar o serviço, mas não deveria.");
      } else {
        console.error("Login falhou: Não foi possível obter o token de autenticação.");
      }
    } catch (error:any) {
      expect(error.response.data.message).toBe("Usuário não tem permissão para acessar.");
    }
  }
});

test('Deve deletar um serviço existente', async () => {
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
		const deleteService = await axios.delete(`http://localhost:3000/admin/service/${serviceId}`, headers);
		const deletedMsg = deleteService.data.message;
		expect(deletedMsg).toBe("Service deleted successfully");
	} else {
		console.error("Login falhou: Não foi possível obter o token de autenticação.");
	}
});

test("Não deve deletar um Serviço sem ser admin", async function () {
  const inputLoginAdm = {
    email: "brunapereira@studio.com.br",
    password: "Bruna24",
  };
  const loginAdm = await axios.post("http://localhost:3000/login", inputLoginAdm);
  expect(loginAdm && loginAdm.data && loginAdm.data.token).toBeTruthy();
  const token = loginAdm.data.token;
  const headers = { headers: { authorization: `Bearer ${token}` } };
  const input = {
    title: "Unha Gel",
    price: "190,00",
    duration: "1:30",
    description: "Aplicar unhas em gel com profissionalismo: Domine as etapas essenciais, desde a preparação das unhas até a finalização com estilo. Criar designs incríveis. Inicie ou aprimore sua carreira na área de beleza. Seja iniciante ou experiente.",
    image_url: "https://pngtree.com/freepng/beautifully-manicured-hands-featuring-natural-nails-with-gel-polish_14113158.html",
    is_course: true,
  };
  const postedService = await axios.post("http://localhost:3000/admin/service", input, headers);
  expect(postedService && postedService.data && postedService.data.service_id).toBeTruthy();
  const serviceId = postedService.data.service_id;
  const inputUser = {
    name: "John Doe",
    email: "john.does@gmail.com",
    phone: "41984498900",
    password: "Bruna24",
  };
  await axios.post("http://localhost:3000/user", inputUser);
  const inputLogin = {
    email: "john.does@gmail.com",
    password: "Bruna24",
  };
  const login = await axios.post("http://localhost:3000/login", inputLogin);
  expect(login && login.data && login.data.token).toBeTruthy();
  const userToken = login.data.token;
  const headersUser = { headers: { authorization: `Bearer ${userToken}` } };
  try {
    await axios.delete(`http://localhost:3000/admin/service/${serviceId}`, headersUser);
    throw new Error("O usuário não-admin conseguiu deletar o serviço, mas não deveria.");
  } catch (error:any) {
    expect(error.response.data.message).toBe("Usuário não tem permissão para acessar.");
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
		end_time: "11:00",
		is_free: false
	};
	const createSchedule = await axios.post("http://localhost:3000/admin/schedule", input, headers);
	const output1 = createSchedule.data;
	expect(output1).toBeDefined();
	} else {
		console.error("Login falhou: Não foi possível obter o token de autenticação.");
	}
});

test("Não deve cadastrar um Horário sem ser admin", async function () {
  const inputLoginAdm = {
    email: "brunapereira@studio.com.br",
    password: "Bruna24",
  };
  const loginAdm = await axios.post("http://localhost:3000/login", inputLoginAdm);
  const token = loginAdm.data.token;
  const headers = { headers: { authorization: `Bearer ${token}` } };
	const input = {
		available_day: "Segunda-feira",
		start_time: "09:00",
		end_time: "11:00",
		is_free: false
	};
  await axios.post("http://localhost:3000/admin/schedule", input, headers);
  const inputUser = {
    name: "John Doe",
    email: "john.does@gmail.com",
    phone: "41984498900",
    password: "Bruna24",
  };
  await axios.post("http://localhost:3000/user", inputUser);
  const inputLogin = {
    email: "john.does@gmail.com",
    password: "Bruna24",
  };
  const login = await axios.post("http://localhost:3000/login", inputLogin);
  expect(login && login.data && login.data.token).toBeTruthy();
  const userToken = login.data.token;
  const headersUser = { headers: { authorization: `Bearer ${userToken}` } };
  try {
    await axios.post("http://localhost:3000/admin/schedule", input, headersUser);
    throw new Error("O usuário não-admin conseguiu deletar o serviço, mas não deveria.");
  } catch (error:any) {
    expect(error.response.data.message).toBe("Usuário não tem permissão para acessar.");
  }
});

test("Deve obter um horario", async function() {
  const input = {
    name: "John Doe",
    email: "john.does@gmail.com",
    phone: "41984498900",
    password: "Bruna24",
  };
  await axios.post("http://localhost:3000/user", input);
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
      end_time: "11:00",
			is_free: false
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

test("Deve obter todos os horários", async () => {
	try {
	  const inputLogin = {
		email: "john.does@gmail.com",
		password: "Bruna24",
	  };
	  const login = await axios.post("http://localhost:3000/login", inputLogin);
	  const token = login.data.token;
	  const headers = { headers: { authorization: `Bearer ${token}` } };
	  const response = await axios.get("http://localhost:3000/schedules", headers);
	  const outputGetSchedules = response.data;
	expect(outputGetSchedules.length).toBeDefined();
	} catch (error:any) {
	  console.error("Erro ao obter usuários:", error.message);
	}
  });

test("Deve editar um schedule", async function() {
  const input = {
    name: "John Doe",
    email: "john.does@gmail.com",
    phone: "41984498900",
    password: "Bruna24",
  };
  await axios.post("http://localhost:3000/user", input);
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
      end_time: "11:00",
			is_free: false
    };
    const createScheduleResponse = await axios.post("http://localhost:3000/admin/schedule", inputSchedule, headers);
    const scheduleId = createScheduleResponse.data.scheduleId;
	const inputUpdated = {
		available_day: "Segunda-feira",
		start_time: "14:00",
		end_time: "15:30",
		is_free: true
	};
	const responseUpdate = await axios.patch(`http://localhost:3000/schedule/${scheduleId}`, inputUpdated, headers);
	const output1 = responseUpdate.data;
	expect(output1.available_day).toBe("Segunda-feira");
	expect(output1.start_time).toBe("14:00");
	expect(output1.end_time).toBe("15:30");
	} else {
		console.error("Login falhou: Não foi possível obter o token de autenticação.");
	}
})

test('Deve deletar um schedule existente', async () => {
  const input = {
    name: "John Doe",
    email: "john.does@gmail.com",
    phone: "41984498900",
    password: "Bruna24",
  };
  await axios.post("http://localhost:3000/user", input);
  const inputLoginAdm = {
    email: "brunapereira@studio.com.br",
    password: "Bruna24",
  };
  const loginAdm = await axios.post("http://localhost:3000/login", inputLoginAdm);
  if (loginAdm && loginAdm.data && loginAdm.data.token) {
    const token = loginAdm.data.token;
    const headers = { headers: { authorization: `Bearer ${token}` } };
    const inputSchedule = {
      available_day: "Segunda-feira",
      start_time: "09:00",
      end_time: "11:00",
			is_free: false
    };
    const createScheduleResponse = await axios.post("http://localhost:3000/admin/schedule", inputSchedule, headers);
    const scheduleId = createScheduleResponse.data.scheduleId;
		const deletedSchedule = await axios.delete(`http://localhost:3000/admin/schedule/${scheduleId}`, headers);
		const deletedMsg = deletedSchedule.data.message;
		expect(deletedMsg).toBe("Schedule deleted successfully");
	} else {
		console.error("Login falhou: Não foi possível obter o token de autenticação.");
	}
});

test("Não deve deletar um Horário sem ser admin", async function () {
  const inputLoginAdm = {
    email: "brunapereira@studio.com.br",
    password: "Bruna24",
  };
  const loginAdm = await axios.post("http://localhost:3000/login", inputLoginAdm);
  const token = loginAdm.data.token;
  const headers = { headers: { authorization: `Bearer ${token}` } };
	const input = {
		available_day: "Segunda-feira",
		start_time: "09:00",
		end_time: "11:00",
		is_free: false
	};
  const scheduleId = await axios.post("http://localhost:3000/admin/schedule", input, headers);
  const inputUser = {
    name: "John Doe",
    email: "john.does@gmail.com",
    phone: "41984498900",
    password: "Bruna24",
  };
  await axios.post("http://localhost:3000/user", inputUser);
  const inputLogin = {
    email: "john.does@gmail.com",
    password: "Bruna24",
  };
  const login = await axios.post("http://localhost:3000/login", inputLogin);
  expect(login && login.data && login.data.token).toBeTruthy();
  const userToken = login.data.token;
  const headersUser = { headers: { authorization: `Bearer ${userToken}` } };
  try {
    await axios.delete(`http://localhost:3000/admin/schedule/${scheduleId}`, headersUser);
    throw new Error("O usuário não-admin conseguiu deletar o serviço, mas não deveria.");
  } catch (error:any) {
    expect(error.response.data.message).toBe("Usuário não tem permissão para acessar.");
  }
});

test("Deve cadastrar um agendamento", async function () {
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
		const input = {
			user_id: "4",
			service_id: "1",
			schedule_id: "1",
		};
		const response1 = await axios.post("http://localhost:3000/appointment", input, headers);
		const output1 = response1.data.appointment_id;
		expect(output1).toBeDefined();
	} else {
		console.error("Login falhou: Não foi possível obter o token de autenticação.");
	}
});

test("Deve obter um appointment", async function() {
	const input = {
		name: "John Doe",
		email: "john.does@gmail.com",
		phone: "41984498900",
		password: "Bruna24",
	};
	await axios.post("http://localhost:3000/user", input);
	const inputLogin = {
		email: "john.does@gmail.com",
		password: "Bruna24",
	};
	const login = await axios.post("http://localhost:3000/login", inputLogin);
	if (login && login.data && login.data.token) {
		const token = login.data.token;
		const headers = { headers: { authorization: `Bearer ${token}` } };
		const input = {
			user_id: "1",
			service_id: "1",
			schedule_id: "1",
		};
		const response1 = await axios.post("http://localhost:3000/appointment", input, headers);
		const output_id = response1.data.appointment_id;
		const response2 = await axios.get(`http://localhost:3000/appointment/${output_id}`, headers);
		const output1 = response2.data;
		expect(output1.user_id).toBe("1");
		expect(output1.service_id).toBe("1");
		expect(output1.schedule_id).toBe("1");
	} else {
		console.error("Login falhou: Não foi possível obter o token de autenticação.");
	}
})

test("Deve obter todos os agendamentos", async () => {
	const inputLogin = {
		email: "brunapereira@studio.com.br",
	    password: "Bruna24",
	};
	const login = await axios.post("http://localhost:3000/login", inputLogin);
	const token = login.data.token;
	const headers = { headers: { authorization: `Bearer ${token}` } };
	const response = await axios.get("http://localhost:3000/admin/appointments", headers);
	const outputGet = response.data;
	expect(outputGet.length).toBeDefined();
});

test("Deve editar um appointment", async function() {
	const inputLogin = {
		email: "john.does@gmail.com",
		password: "Bruna24",
	};
	const login = await axios.post("http://localhost:3000/login", inputLogin);
	if (login && login.data && login.data.token) {
		const token = login.data.token;
		const headers = { headers: { authorization: `Bearer ${token}` } };
		const input = {
			user_id: "4",
			service_id: "1",
			schedule_id: "1",
		};
		const response1 = await axios.post("http://localhost:3000/appointment", input, headers);
		const output_id = response1.data.appointment_id;
		const inputUpdated = {
			user_id: "3",
			service_id: "1",
			schedule_id: "1",
		};
		const response2 = await axios.patch(`http://localhost:3000/appointment/${output_id}`, inputUpdated, headers);
		const output1 = response2.data; 
		expect(output1.user_id).toBe("3");
		expect(output1.service_id).toBe("1");
		expect(output1.schedule_id).toBe("1");
	} else {
		console.error("Login falhou: Não foi possível obter o token de autenticação.");
	}
})

test('Deve deletar um appointment existente', async () => {
	const inputLogin = {
		email: "john.does@gmail.com",
		password: "Bruna24",
	};
	const login = await axios.post("http://localhost:3000/login", inputLogin);
	if (login && login.data && login.data.token) {
		const token = login.data.token;
		const headers = { headers: { authorization: `Bearer ${token}` } };
		const input = {
			user_id: "4",
			service_id: "1",
			schedule_id: "1",
		};
		const response1 = await axios.post("http://localhost:3000/appointment", input, headers);
		const output_id = response1.data.appointment_id;
		const response2 = await axios.delete(`http://localhost:3000/appointment/${output_id}`);
		const deletedAppointment = response2.data.message;
		expect(deletedAppointment).toBe("Appointment deleted successfully");
	} else {
		console.error("Login falhou: Não foi possível obter o token de autenticação.");
	}
});
