import axios from "axios";
test("Deve cadastrar um usuário", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		phone: "83432616074",
    password: "123456",
	};
	const response1 = await axios.post("http://localhost:3000/user", input);
	const output1 = response1.data;
	expect(output1).toBeDefined();
});

test("Deve obter um usuário", async function() {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		phone: "41900000015",
    password: "123456",
	};
	const response1 = await axios.post("http://localhost:3000/user", input);
	const outputCreateUser = response1.data;
	const response2 = await axios.get(`http://localhost:3000/user/${outputCreateUser}`);
	const outputGetUser = response2.data.message;
	expect(outputGetUser.name).toBe("John Doe")
	expect(outputGetUser.email).toBe("john.doe@gmail.com")
	expect(outputGetUser.phone).toBe("41900000015")
})
test('Deve deletar um usuário existente', async () => {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		phone: "41900000015",
    password: "123456",
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
    password: "password"
  };

  try {
    const response = await axios.post("http://localhost:3000/login", input);
    console.log('teste login', response);
    expect(response.status).toBe(200);
    expect(response.data.user).toBeDefined();
    expect(response.data.token).toBeDefined();
  } catch (error:any) {
    fail(error.message);
  }
});