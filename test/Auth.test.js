const expect = require("chai").expect;
const request = require("supertest");

const db = require("../models/index");

const api = request("http://localhost:8080/api/v1");

describe("Auth", function() {
  beforeEach(async function() {
    const { sequelize } = db;
    await sequelize.sync({ force: true });
  });

  describe("POST /register", function() {
    const loginData = {
      username: "testuser",
      email: "test@test.com",
      password: "rightpassword"
    };

    it("returns status code 201", async function() {
      const response = await api.post("/register").send(loginData);
      expect(response.statusCode).to.equal(201);
    });
    it("returns user in right format", async function() {
      const response = await api.post("/register").send(loginData);
      expect(response.body).to.have.property("user");
      expect(response.body).to.have.property("token");
      expect(response.body.status).to.equal("success");
    });
  });

  describe("POST /login", function() {
    beforeEach(async function() {
      const { User } = db;
      const user = await User.create({
        username: "testuser",
        email: "test@test.com",
        password: "rightpassword"
      });
    });

    it("returns status code 200", async function() {
      const response = await api.post("/login").send({
        email: "test@test.com",
        password: "rightpassword"
      });
      expect(response.statusCode).to.equal(200);
    });

    it("ERROR wrong email returns status code 401", async function() {
      const response = await api.post("/login").send({
        email: "wrongemail@test.com",
        password: "rightpassword"
      });
      expect(response.statusCode).to.equal(401);
    });

    it("ERROR wrong password returns status code 401", async function() {
      const response = await api.post("/login").send({
        email: "test@test.com",
        password: "wrongpassword"
      });
      expect(response.statusCode).to.equal(401);
    });
  });
});