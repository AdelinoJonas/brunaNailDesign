const supertest = require("supertest");

const app = require("../src/app");

describe("Clients Endpoints", () => {
  let request = supertest(app);
  let token = "";
  let requestCommon
  let tokenCommon = ""
  beforeAll(async () => {
    const response = await request.post("/login").send({
      email: process.env.TEST_USER,
      password: process.env.TEST_PASSWORD,
    });
    token = response.body.token;

    const responseCommon = await request.post("/login").send({
      email: process.env.TEST_COMMON_USER,
      password: process.env.TEST_COMMON_PASSWORD,
    });
    tokenCommon = responseCommon.body.token;
  });

  beforeEach(async () => {
    request = supertest.agent(app).set("Authorization", "Bearer "+token);

    requestCommon = supertest.agent(app).set("Authorization", "Bearer "+tokenCommon);
  });

  describe("Get User Infos", () => {
    it("Responsible user", async () => {
      const { body, statusCode } = await request.get("/user");

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty("infos");
      expect(body).toHaveProperty("users");
    });

    it("Common user", async () => {
      const { body, statusCode } = await requestCommon.get("/user");

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty("infos");
      expect(body).not.toHaveProperty("users");
    });
  });


  describe("Change Password", () => {
    it("Success", async () => {
      const { body, statusCode } = await request.patch("/user/password").send({password:process.env.TEST_PASSWORD})

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty("message");
    });

    it("Invalid Password", async () => {
      const { body, statusCode } = await requestCommon.patch("/user/password").send({password:"123456"})

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty("message");
    });
  });
});
