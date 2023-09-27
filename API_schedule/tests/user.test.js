const supertest = require("supertest");
const app = require("../src/app");

test("Login success",async function(){
  const request = supertest.agent(app);
    const { status, body } = await request.post("/login").send({
      email: process.env.TEST_USER,
      password: process.env.TEST_PASSWORD,
    });
    expect(status).toBe(200);
    expect(body).toHaveProperty("token");
});
