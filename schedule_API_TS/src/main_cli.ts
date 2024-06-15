import CreateUser from "./application/usecase/User/CreateUser";
import UserRepositoryDataBase from "./infra/repository/UserRepositoryDataBase";
import CLIController from "./infra/cli/CLIController";
import NodeInputOutput from "./infra/cli/NodeInputOutput";

const userRepository = new UserRepositoryDataBase();
const createUser = new CreateUser(userRepository);
const inputOutput = new NodeInputOutput();
new CLIController(inputOutput, createUser);