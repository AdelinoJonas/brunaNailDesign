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
