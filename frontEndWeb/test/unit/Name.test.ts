import Name  from "../../src/domain/Name";

test("Deve validar o nome", function() {
  const name = "jhon doe";
  const isValid = new Name(name);
  expect(isValid).toBeTruthy();
})
test("Não deve validar o nome inválido", function() {
  const name = "jhon";
  expect(() => new Name(name)).toThrow(new Error("Invalid name"));
})
