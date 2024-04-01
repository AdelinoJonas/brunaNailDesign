import CreateUser from "../../src/application/usecase/CreateUser";
import UserRepositoryDataBase from "../../src/infra/repository/UserRepositoryDataBase";

test("Deve cadastrar um Usuário", async function(){
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		phone: "41984498900",
    password: "Bruna24",
	};
  const usecase = new CreateUser(new UserRepositoryDataBase());
  const output = await usecase.execute(input);  
  expect(output).toBeDefined();
});
test("Não deve cadastrar um usuário com e-mail inválido", async function(){
	const input = {
		name: "John Doe",
		email: "john.doe@gmail",
		phone: "41984498900",
    password: "Bruna24",
	};
  const usecase = new CreateUser(new UserRepositoryDataBase());
  await expect(() => usecase.execute(input)).rejects.toThrow(new Error("Invalid email"));  
});
test("Não deve cadastrar um usuário com telefone inválido", async function(){
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		phone: "84498900",
    password: "Bruna24",
	};
  const usecase = new CreateUser(new UserRepositoryDataBase());
  await expect(() => usecase.execute(input)).rejects.toThrow(new Error("Invalid Phone"));  
});
test("Não deve cadastrar um usuário com senha inválido", async function(){
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		phone: "84498900",
    password: "Bruna",
	};
  const usecase = new CreateUser(new UserRepositoryDataBase());
  await expect(() => usecase.execute(input)).rejects.toThrow(new Error("Invalid Password"));
});

// test("Deve obter um usuário", async function(){
// 	const input = {
// 		name: "John Doe",
// 		email: "john.doe@gmail.com",
// 		phone: "41984498900",
//     password: "Bruna24",
// 	};
//   const usecase = new CreateUser(new UserRepositoryDataBase());
//   const output = await usecase.execute(input); 
//   const usecase1 = new GetUser(new UserRepositoryDataBase());
//   const output1 = await usecase1.execute({passengerId: output.user_id}); 
//   expect(output1.name).toBe("John Does");
//   expect(output1.email).toBe("jhon.does@gmail.com");
//   expect(output1.document).toBe("83432616074");
// });