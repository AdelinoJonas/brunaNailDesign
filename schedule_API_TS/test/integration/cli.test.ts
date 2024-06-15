import CreateUser from "../../src/application/usecase/User/CreateUser";
import CLIController from "../../src/infra/cli/CLIController";
import InputOutputHandler from "../../src/infra/cli/InputOutputHandler";
import UserRepositoryDataBase from "../../src/infra/repository/UserRepositoryDataBase";

test("Deve criar um passageiro com cli", async function(){
  const output: any  = [];
  const userRepository = new UserRepositoryDataBase();
  const createUser = new CreateUser(userRepository);
  const inputOutput = new class extends InputOutputHandler {
      write(text: string):void {
          output.push(JSON.parse(text));
      }
  };
  new CLIController(inputOutput, createUser);
  await inputOutput.type("create-user ana ana@gmail.com 41984498900 Bruna24");  
  expect(output[0].user_id).toBeDefined();
});