const supertest = require("supertest");

const app = require("../src/app");

describe("login test", () => {
  const request = supertest.agent(app);

  it("Login success", async () => {
    const { status, body } = await request.post("/login").send({
      email: process.env.TEST_USER,
      password: process.env.TEST_PASSWORD,
    });
    expect(status).toBe(200);
    expect(body).toHaveProperty("token");
  });

  it("Invalid email", async () => {
    const { status, body } = await request.post("/login").send({
      email: "testemail.com.br",
      password: "12345678",
    });

    expect(status).toBe(500);
    expect(body.message).toBe("email deve ser um email válido");
  });

  it("Wrong password", async () => {
    const { body, status } = await request.post("/login").send({
      email: process.env.TEST_USER,
      password: "12345677",
    });

    expect(status).toBe(400);
    expect(body.message).toBe("Email ou Password inválido." );
  });

  it("User not found", async () => {
    const { body, status } = await request.post("/login").send({
      email: "testtest@email.com.br",
      password: "12345678",
    });

    expect(status).toBe(400);
    expect(body.message).toBe("Email ou Password inválido." );
  });
});
