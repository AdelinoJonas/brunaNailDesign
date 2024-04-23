import LoginUser from "../../src/application/usecase/Login";
import CreateUser from "../../src/application/usecase/User/CreateUser";
import DeleteUser from "../../src/application/usecase/User/DeleteUser";
import GetUser from "../../src/application/usecase/User/GetUser";
import UpdateUser from "../../src/application/usecase/User/UpdateUser";
import User from "../../src/domain/User";
import LoginRepositoryDataBase from "../../src/infra/repository/LoginRepositoryDataBase";
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

test("Deve obter um usuário", async function(){
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		phone: "41984498900",
    password: "Bruna24",
	};
  const usecase = new CreateUser(new UserRepositoryDataBase());
  const output = await usecase.execute(input); 
  const usecase1 = new GetUser(new UserRepositoryDataBase());
  const output1 = await usecase1.execute({userId: output.user_id}); 
  expect(output1.name).toBe("John Doe");
  expect(output1.email).toBe("john.doe@gmail.com");
  expect(output1.phone).toBe("41984498900");
});

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
const usecase = new CreateUser(new UserRepositoryDataBase());
const output = await usecase.execute(input); 
const usecase1 = new  UpdateUser(new UserRepositoryDataBase());
const output1 = await usecase1.execute({userId:output.user_id, data:inputUpdated}); 
expect(output1.name).toBe("Joana Darc");
expect(output1.email).toBe("joana.dark@gmail.com");
expect(output1.phone).toBe("41984494689");
})

test('Deve deletar um usuário existente', async () => {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		phone: "41984498900",
    password: "Bruna24",
	};
  const usecase = new CreateUser(new UserRepositoryDataBase());
  const output = await usecase.execute(input); 
  const usecase1 = new DeleteUser(new UserRepositoryDataBase());
  const output1 = await usecase1.execute({userId: output.user_id});
	const deletedUser = output1.message;
	expect(deletedUser).toBe("User deleted successfully");
});
test('Deve realizar o login', async () => {
  const input = {
    email: "brunapereira@studio.com.br",
    password: "Bruna24"
  };
    const useCase = new LoginUser(new LoginRepositoryDataBase());
		const output = await useCase.execute(input);
    expect(output.user).toBeDefined();
    expect(output.token).toBeDefined();
});