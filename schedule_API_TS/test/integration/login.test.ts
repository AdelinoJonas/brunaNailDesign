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

test('Deve verificar se é admin', async () => {
  const input = {
    email: "brunapereira@studio.com.br",
    password: "Bruna24"
  };
	const response = await axios.post("http://localhost:3000/login", input);	
	expect(response.status).toBe(200);
	expect(response.data.user.is_admin).toBeTruthy();
});