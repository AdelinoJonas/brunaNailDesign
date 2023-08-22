const supertest = require("supertest");

const app = require("../src/app");

describe("Admin Endpoints", () => {
  let request = supertest.agent(app);
  let token = "";
  beforeAll(async () => {
    const { body } = await request.post("/login").send({
      email: process.env.TEST_USER,
      password: process.env.TEST_PASSWORD,
    });
    token = body.token;
  });

  beforeEach(async () => {
    request = supertest.agent(app).set("Authorization", "Bearer " + token);
    return request;
  });

  describe("List Users", () => {
    let idUser = "";
    // let idCommonUser = "";
    it("All Users", async () => {
      const { body, statusCode } = await request.get("/admin/users");

      for (let i = 0; i <= body.length; i++) {
        if (!idUser && body[i].is_responsible) {
          idUser = body[i].id;
          break;
        }
      }

      // for (let i = 0; i <= body.length; i++) {
      //   if (!idCommonUser && !body[i].is_responsible) {
      //     idCommonUser = body[i].id;
      //     break;
      //   }
      // }

      expect(body.length).toBeGreaterThan(1);
      expect(statusCode).toBe(200);
    });

    it("Get user responsible", async () => {
      const { body, statusCode } = await request.get(`/admin/user/${idUser}`);

      // expect(body).toHaveProperty("users");
      // expect(body).toHaveProperty("infos");
      expect(body.id).toBe(idUser);
      expect(statusCode).toBe(200);
    });

    it("User Not Found", async () => {
      const { body, statusCode } = await request.get(
        `/admin/user/50975d1c-68dd-4478-a4c6-1a21a0eea7d7`
      );

      expect(body.message).toBe("Usuário não encontrado");
      expect(statusCode).toBe(400);
    });

    it("Invalid Id", async () => {
      const { body, statusCode } = await request.get(
        `/admin/user/50975d1c-68dd-4478-a4c6-1a21a0eea7d`
      );
      expect(body).toHaveProperty("message");
      expect(statusCode).toBe(400);
    });

    it("By status", async () => {
      const { body, statusCode } = await request.get("/admin/users/true");

      expect(body.length).toBeGreaterThan(1);
      expect(statusCode).toBe(200);
    });

    it("Error Status", async () => {
      const { body, statusCode } = await request.get("/admin/users/verdadeiro");

      expect(body.message).toBe(
        'is_active deve ser um tipo de `boolean`, Mas o valor final foi: `"verdadeiro"`.'
      );
      expect(statusCode).toBe(400);
    });
  });
});
