import Login from "../../domain/Login";
import LoginRepository from "../repository/LoginRepository";

export default class LoginUser {
  constructor ( readonly loginRepository: LoginRepository) {
  }

  async execute (input: Input): Promise<Output> {
    const userData = new Login(input.email, input.password);
    console.log('usecase', userData);
    
    const user = await this.loginRepository.login(userData);
    console.log('usecase', user);
    
    return user;
  }
}

type Input = {
  email: string,
  password: string
}

type Output = {
  user: string,
  token: string,
}