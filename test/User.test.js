const expect = require("chai").expect;
const request = require("supertest");

const db = require("../models/index");
const { createFakeUsers } = require("../utils/fakeData");
const { jwtSignUser } = require("../utils/utils");

const api = request("http://localhost:8080/api/v1");

describe("User", function() {
  beforeEach(async function() {
    const { sequelize } = db;
    await sequelize.sync({ force: true });
  });

  describe("GET /users", function() {
    beforeEach(async function() {
      const { User } = db;
      const userData = createFakeUsers(50);
      await User.bulkCreate(userData);
    });

    it("returns status code 200", async function() {
      const response = await api.get("/users");
      expect(response.statusCode).to.equal(200);
    });

    it("returns all users", async function() {
      const response = await api.get("/users");
      expect(response.body).to.have.lengthOf(50);
    });

    it("returns users in right format", async function() {
      const response = await api.get("/users");
      expect(response.body[0]).to.have.property("id");
      expect(response.body[0]).to.have.property("username");
      expect(response.body[0]).to.have.property("email");
      expect(response.body[0]).not.to.have.property("password");
    });
  });

  describe("GET /users/:user_id", function() {
    beforeEach(async function() {
      const { User } = db;
      await User.create({
        username: "testuser",
        email: "test@test.com",
        password: "rightpassword"
      });
    });

    it("returns status code 200", async function() {
      const token = await jwtSignUser({ id: 1 });

      const response = await api
        .get("/users/1")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).to.equal(200);
    });

    it("ERROR unauthorized returns status code 403", async function() {
      const token = await jwtSignUser({ id: 1 });

      const response = await api
        .get("/users/2")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).to.equal(403);
    });
  });
});
