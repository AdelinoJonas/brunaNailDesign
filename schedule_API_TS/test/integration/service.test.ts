import CreateService from "../../src/application/usecase/Service/CreateService";
import DeleteService from "../../src/application/usecase/Service/DeleteService";
import GetService from "../../src/application/usecase/Service/GetService";
import UpdateService from "../../src/application/usecase/Service/UpdateService";
import ServiceRepositoryDataBase from "../../src/infra/repository/ServiceRepositoryDataBase";

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