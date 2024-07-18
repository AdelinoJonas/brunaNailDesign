import Email from "../../src/domain/Email";
import Name from "../../src/domain/Name";
import Password from "../../src/domain/Password";
import Phone from "../../src/domain/Phone";
import User from "../../src/domain/User";

test("Não deve criar um usuário inválido", function() {
  const invalidName = ""; 

  const validEmail = new Email("john.doe@example.com");
  const validPhone = new Phone("41984498900");
  const validPassword = new Password("Bruna.24");

  expect(() => new User(new Name(invalidName), validEmail, validPhone, validPassword)).toThrow(new Error("Invalid name"));
});

test("Deve criar um usuário com valores válidos", function() {
  const name = new Name("John Doe");
  const email = new Email("john.doe@example.com");
  const phone = new Phone("41984498900");
  const password = new Password("Bruna.24");
  const user = new User(name, email, phone, password);
  expect(user.name).toEqual(name);
  expect(user.email).toEqual(email);
  expect(user.phone).toEqual(phone);
  expect(user.password).toEqual(password);
});
