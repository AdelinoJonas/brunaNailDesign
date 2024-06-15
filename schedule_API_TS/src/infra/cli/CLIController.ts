import CreateUser from "../../application/usecase/User/CreateUser";
import InputOutputHandler from "./InputOutputHandler";

export default class CLIController {
  
  constructor(inputOutput: InputOutputHandler, createUser: CreateUser){
    inputOutput.on("create-user", async function (params: any) {
      try {
          const [name, email, phone, password] = params.split(" ");
          const output = await createUser.execute({name, email, phone, password});
          inputOutput.write(JSON.stringify(output)); 
      } catch (e:any) {
          inputOutput.write(e.message);
      }
    })
  }
};