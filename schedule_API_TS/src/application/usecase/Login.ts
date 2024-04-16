import Login from "../../domain/Login";
import LoginRepository from "../repository/LoginRepository";

export default class LoginUser {
  constructor ( readonly loginRepository: LoginRepository) {
  }

  async execute (input: Input): Promise<Output> {
    const user = new Login(input.email, input.password);
    console.log('usecase', user);
    
    const data = await this.loginRepository.login(user);
    console.log('usecase', data);
    
    return data;
  }
}

type Input = {
  email: string,
  password: string
}

type Output = {
  data: string,
  token: string,
}