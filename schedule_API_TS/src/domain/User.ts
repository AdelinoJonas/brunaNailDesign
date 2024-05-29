import Email from "./Email";
import Password from "./Password";
import Phone from "./Phone";

export default class User {
  email: Email;
  password: Password;
  phone: Phone;
  is_active: boolean;

  constructor (readonly name: string, email: string, phone: string, password: string, is_active: boolean = true) {
    this.email = new Email(email);
    this.password = new Password(password);
    this.phone = new Phone(phone);
    this.is_active = is_active;
  }

  static create (name: string, email: string, phone: string, password: string, is_active: boolean = true) {
    return new User(name, email, phone, password, is_active);
  }
}
