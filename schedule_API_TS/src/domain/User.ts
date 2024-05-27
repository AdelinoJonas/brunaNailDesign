import Email from "./Email";
import Password from "./Password";
import Phone from "./phone";

export default class User {
  email: Email;
  password: Password;
  phone: Phone;

  constructor (readonly name: string, email: string, phone: string, password: string) {
    this.email = new Email(email);
    this.password = new Password(password);
    this.phone = new Phone(phone);
  }

  static create (name: string, email: string, phone: string, password: string) {
    return new User(name, email, phone, password);
  }
}