import CreateUser from "./application/usecase/CreateUser";
import UserRepositoryDataBase from "./infra/repository/UserRepositoryDataBase";

process.stdin.on("data", async function(chunk){
  const command = chunk.toString().replace(/\n/g, "");
  try {
    if (command.startsWith("create-user")) {
      const [ name, email, phone, password ] = command.replace("create-user","").split("");
      const usecase = new CreateUser(new UserRepositoryDataBase());
      await usecase.execute({name, email, phone, password});
    }
  } catch (e:any) {
    console.log(e.message);
  }
})