import LoginUser from "../../src/application/usecase/Login";
import CreateService from "../../src/application/usecase/Service/CreateService";
import DeleteService from "../../src/application/usecase/Service/DeleteService";
import GetService from "../../src/application/usecase/Service/GetService";
import UpdateService from "../../src/application/usecase/Service/UpdateService";
import CreateUser from "../../src/application/usecase/User/CreateUser";
import DeleteUser from "../../src/application/usecase/User/DeleteUser";
import GetUser from "../../src/application/usecase/User/GetUser";
import UpdateUser from "../../src/application/usecase/User/UpdateUser";
import LoginRepositoryDataBase from "../../src/infra/repository/LoginRepositoryDataBase";
import ServiceRepositoryDataBase from "../../src/infra/repository/ServiceRepositoryDataBase";
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

test("Deve cadastrar um Serviço", async function () {
	const input = {
		title: "Unha Gel",
    price: "190,00",
    duration:"1:30",
    description:"Aplicar unhas em gel com profissionalismo: Domine as etapas essenciais, desde a preparação das unhas até a finalização com estilo.Criar designs incríveis. Inicie ou aprimore sua carreira na área de beleza.Seja iniciante ou experiente.",
    image:"https://pngtree.com/freepng/beautifully-manicured-hands-featuring-natural-nails-with-gel-polish_14113158.html",
    is_course: true
	};
	const useCase = new CreateService(new ServiceRepositoryDataBase());
	const output = await useCase.execute(input);
	const output1 = output.service_id;
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
	const usecase = new CreateService(new ServiceRepositoryDataBase());
  const output = await usecase.execute(input); 
  const usecase1 = new GetService(new ServiceRepositoryDataBase());
  const output1 = await usecase1.execute({serviceId: output.service_id}); 
	expect(output1.title).toBe("Unha Gel");
	expect(output1.price).toBe("190,00");
	expect(output1.duration).toBe("1:30");
	expect(output1.description).toBe("Aplicar unhas em gel com profissionalismo: Domine as etapas essenciais, desde a preparação das unhas até a finalização com estilo.Criar designs incríveis. Inicie ou aprimore sua carreira na área de beleza.Seja iniciante ou experiente.");
	expect(output1.image).toBe("https://pngtree.com/freepng/beautifully-manicured-hands-featuring-natural-nails-with-gel-polish_14113158.html");
	expect(output1.is_course).toBeTruthy();
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
	const usecase = new CreateService(new ServiceRepositoryDataBase());
	const output = await usecase.execute(input); 
	const usecase1 = new  UpdateService(new ServiceRepositoryDataBase());
	const output1 = await usecase1.execute({serviceId:output.service_id, data:inputUpdated}); 
	expect(output1.title).toBe("Unha Gel com desenho");
	expect(output1.price).toBe("190,00");
	expect(output1.duration).toBe("1:30");
	expect(output1.description).toBe("MOdelo lindo.");
	expect(output1.image).toBe("https://pngtree.com/freepng/beautifully-manicured-hands-featuring-natural-nails-with-gel-polish_14113158.html");
	expect(output1.is_course).toBeFalsy();
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
  const usecase = new CreateService(new ServiceRepositoryDataBase());
  const output = await usecase.execute(input); 
  const usecase1 = new DeleteService(new ServiceRepositoryDataBase());
  const output1 = await usecase1.execute({serviceId: output.service_id});
	const deletedService = output1.message;
	expect(deletedService).toBe("Service deleted successfully");
});