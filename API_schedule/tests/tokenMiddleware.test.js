const supertest = require("supertest");

const app = require("../src/app");

describe("Token Middleware", () => {
  let request = supertest.agent(app);

  describe("Test without token",()=>{
    it("Without token",async ()=>{

      const {body,statusCode} = await request.get("/admin/users")
      expect(body).toHaveProperty("message");
      expect(statusCode).toBe(401);
    })

    it("Invalid token",async ()=>{
      request = supertest.agent(app).set("Authorization", `bearer tokentokentoken`)

      const {body,statusCode} = await request.get("/admin/users")
      expect(body).toHaveProperty("message");
      expect(statusCode).toBe(500);
    })
  })
});
