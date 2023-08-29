const app = require("../index");
const request = require("supertest");
const { expect } = require("chai");

describe("User Authentication", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/v1/register/client").send({
      type: "Client",
      email: "test@example.com",
      name: "Test User",
      password: "TestPassword123!",
      consultation: "Some consultation text",
    });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("token");
  });

  it("should authenticate an existing user", async () => {
    const res = await request(app).post("/api/v1/login").send({
      email: "test@example.com",
      password: "TestPassword123!",
    });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
  });

  it("should not authenticate with incorrect password", async () => {
    const res = await request(app).post("/api/v1/login").send({
      email: "test@example.com",
      password: "IncorrectPassword",
    });

    expect(res.status).to.equal(401);
  });
});
