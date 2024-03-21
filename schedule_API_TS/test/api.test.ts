import axios from "axios";
test("Deve cadastrar um cliente", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		phone: "83432616074",
    password: "123456",
	};
	const response1 = await axios.post("http://localhost:3000/client", input);
	const output1 = response1.data;
	expect(output1).toBeDefined();
});