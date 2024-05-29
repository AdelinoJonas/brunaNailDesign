import User from "../../src/domain/User";

test("Deve criar um usuário", function () {
  const user = User.create("Jhon Doe","jhon.doe@gmail.com","41984498900", "Bruna24");
  expect(user.name).toBe("Jhon Doe");
  expect(user.email.value).toBe("jhon.doe@gmail.com");
  expect(user.phone.value).toBe("41984498900");
});

test("Não pode criar um usuário com telefone inválido", function () {
  expect(() => User.create("Jhon Doe","jhon.doe@gmail.com","984498900", "Bruna24")).toThrow(new Error("Invalid Phone"));
});

test("Não pode criar um usuário com email inválido", function () {
  expect(() => User.create("Jhon Doe","jhon.doe@gmail","984498900", "Bruna24")).toThrow(new Error("Invalid email"));
});