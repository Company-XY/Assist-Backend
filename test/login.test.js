const request = require("supertest");
const app = require("../index"); // Update this path to your app's entry point

describe("User Login", () => {
  it("should authenticate a registered user", async () => {
    const newUser = {
      role: "Freelancer",
      type: "Individual",
      name: "Test User",
      email: "oloogeorge633@gmail.com",
      password: "Olosko2018?",
      consultation: false,
    };

    // Register a new user
    await request(app).post("/api/v1/register/freelancer").send(newUser);

    // Log in the registered user
    const response = await request(app).post("/api/v1/login").send({
      email: newUser.email,
      password: newUser.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("role", newUser.role);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("name", newUser.name);
    expect(response.body).toHaveProperty("email", newUser.email);
    // Add more assertions for other properties if needed
  });

  it("should not authenticate with incorrect password", async () => {
    const registeredUser = {
      email: "oloogeorge633@gmail.com",
      password: "WrongPassword",
    };

    const response = await request(app)
      .post("/api/v1/login")
      .send(registeredUser);

    expect(response.status).toBe(401);
  });
});
