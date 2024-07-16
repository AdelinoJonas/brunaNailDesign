import Name from "./Name";
import Email from "./Email";
import Phone from "./Phone";
import Password from "./Password";

export default class User {
  userId?: string;
  name: Name;
  email: Email;
  phone: Phone;
  password: Password;

  constructor(
    name: Name,
    email: Email,
    phone: Phone,
    password: Password
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }

  static create(builder: UserBuilder) {
    return new User(
      builder.name,
      builder.email,
      builder.phone,
      builder.password
    );
  }
}
export class UserBuilder {
  name: Name;
  email: Email;
  phone: Phone;
  password: Password;

  constructor() {
    this.name = new Name("");
    this.email = new Email("");
    this.phone = new Phone("");
    this.password = new Password("");
  }

  build() {
    return User.create(this);
  }
}