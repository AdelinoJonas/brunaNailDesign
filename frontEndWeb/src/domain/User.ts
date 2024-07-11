import Name from "./Name";
import Email from "./Email";
import Phone from "./Phone";
import Password from "./Password";

export default class User {
  userId: string;
  name: Name;
  email: Email;
  phone: Phone;
  password: Password;

  constructor(
    userId: string,
    name: Name,
    email: Email,
    phone: Phone,
    password: Password
  ) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }

  static create(builder: UserBuilder) {
    return new User(
      builder.userId,
      builder.name,
      builder.email,
      builder.phone,
      builder.password
    );
  }
}
export class UserBuilder {
  userId: string;
  name: Name;
  email: Email;
  phone: Phone;
  password: Password;

  constructor() {
    this.userId = "";
    this.name = new Name("");
    this.email = new Email("");
    this.phone = new Phone("");
    this.password = new Password("");
  }

  build() {
    return User.create(this);
  }
}