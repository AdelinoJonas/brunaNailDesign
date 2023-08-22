const supertest = require("supertest");

const app = require("../src/app");

describe("Clients Endpoints", () => {
  let request = supertest(app);
  let token = "";
  beforeAll(async () => {
    const response = await request.post("/login").send({
      email: process.env.TEST_USER,
      password: process.env.TEST_PASSWORD,
    });
    token = response.body.token;
  });

  beforeEach(async () => {
    request = supertest.agent(app).set("Authorization", "Bearer " + token);
  });

  let client;

  describe("List All clients by office", () => {
    it("list clients", async () => {
      const { body, statusCode } = await request.get("/clients");

      expect(statusCode).toBe(200);
      client = body[0];
    });
  });

  describe("Get client", () => {
    it("Show infos", async () => {
      const { body, statusCode } = await request.get(`/client/${client.id}`);

      expect(statusCode).toBe(200);
      expect(body.name).toBe(client.name);
    });

    it("Client dont find", async () => {
      const { body, statusCode } = await request.get(
        `/client/${client.offices_id}`
      );

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty("message", "Cliente não encontrado");
    });
  });
});
