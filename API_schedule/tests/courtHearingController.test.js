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
    return token = response.body.token;
  });

  beforeEach(async () => {
    request = supertest.agent(app).set("Authorization", "Bearer "+token);
  });

  let court;

  describe("Create Court Hearing", () => {
    it("Success", async () => {
      const { body, statusCode } = await request.post("/court").send({
        user_id: process.env.TEST_USER_ID,
        clients_id: process.env.TEST_CLIENT_ID,
        type: process.env.TEST_TYPE_ID,
        process_number: "123456789-ASDFG-12345",
        opposing: "LOJAS AMERICANAS",
        is_remote: true,
        date: "2023-12-12",
        time: "12:00",
        address_link: "https://www.link.com",
        is_notified: false,
      });

      expect(statusCode).toBe(201);
      court = body.insertedprocedure;
    });
  });

  describe("List All Court Hearing by office", () => {
    it("list Courts Hearing", async () => {
      const { body, statusCode } = await request.get("/court");

      expect(statusCode).toBe(200);
    });
  });

  describe("Get Court Hearing", () => {
    it("Show infos", async () => {
      const { body, statusCode } = await request.get(`/court/${court.id}`);

      expect(statusCode).toBe(200);
      expect(body.name).toBe(court.name);
    });

    it("dont find", async () => {
      const { body, statusCode } = await request.get(
        `/court/${court.offices_id}`
      );

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty("message", "Audiência não encontrada.");
    });
  });

  describe("Update Court Hearing", () => {
    it("Success", async () => {
      const { body, statusCode } = await request
        .patch(`/court/${court.id}`)
        .send({
          is_notified: true,
        });

      expect(statusCode).toBe(200);
      expect(body.is_notified).toBe(true);
    });

    it("dont find", async () => {
      const { body, statusCode } = await request
        .patch(`/court/${court.id}`)
        .send({
          is_notified: "truee",
        });

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty(
        "message",
        'is_notified deve ser um tipo de `boolean`, Mas o valor final foi: `"truee"`.'
      );
    });
  });

  describe("Delete Court Hearing", () => {
    it("Success", async () => {
      const { body, statusCode } = await request.delete(`/court/${court.id}`);

      expect(statusCode).toBe(200);
      expect(body.message).toBe("Audiência excluída com sucesso.");
    });

    it("dont find", async () => {
      const { body, statusCode } = await request.delete(`/court/${court.id}`);

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty("message", "Audiência não encontrada.");
    });
  });
});
