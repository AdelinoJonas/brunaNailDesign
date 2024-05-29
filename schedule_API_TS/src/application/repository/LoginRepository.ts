import Login from "../../domain/Login";

export default interface LoginRepository {
  login(login: Login): Promise<any>;
}