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

test.only("Deve cadastrar um horário", async function () {
	const input = {
		available_day: "Segunda-feira",
		start_time: "09:00",
		end_time: "11:00"
	};
	const response1 = await axios.post("http://localhost:3000/schedule", input);
	const output1 = response1.data;
	expect(output1).toBeDefined();
});