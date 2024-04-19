import { validate } from "../../src/EmailValidator";
import Email  from "../../src/domain/Email";

test("Deve validar o email", function() {
  const email = "jhon.doe@gmail.com";
  const isValid = validate(email);
  expect(isValid).toBeTruthy();
})

test("Não deve validar o email inválido", function() {
  const email = "jhon.doe@gmail";
  const isValid = validate(email);
  expect(isValid).toBeFalsy();
})

test("Deve validar o email", function() {
  const email = "jhon.doe@gmail.com";
  const isValid = new Email(email);
  expect(isValid).toBeTruthy();
})
test("Não deve validar o email inválido", function() {
  const email = "jhon.doe@gmail";
  expect(() => new Email(email)).toThrow(new Error("Invalid email"));
})