import Email from "./Email";
import Password from "./Password";

export default class Login {
  email: Email;
  password: Password;

  constructor (readonly emailLogin:string, password: string) {
    console.log(emailLogin);
    
    this.email = new Email(emailLogin);
    this.password = new Password(password);    
  }
}