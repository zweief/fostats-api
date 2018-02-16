const expect = require("chai").expect;
const request = require("supertest");

const db = require("../models/index");
const { createFakeUsers, createRegisterData } = require("../utils/fakeData");
const { jwtSignUser } = require("../utils/utils");

const api = request("http://localhost:8080/api/v1");

describe("User", function() {
  const { sequelize, User } = db;

  const userOne = ["testuser", "test@test.com", "rightpassword"];
  const userTwo = ["testuser_2", "example@test.com", "rightpassword"];

  const token = jwtSignUser({ id: 1 });

  beforeEach(async function() {
    await sequelize.sync({ force: true });
  });

  describe("GET /users", function() {
    beforeEach(async function() {
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
      const data = createRegisterData(...userOne);
      await User.create(data);
    });

    it("returns status code 200", async function() {
      const response = await api
        .get("/users/1")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).to.equal(200);
    });

    it("ERROR unauthorized returns status code 403", async function() {
      const response = await api
        .get("/users/2")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).to.equal(403);
    });
  });

  describe("DELETE /users/:user_id", function() {
    beforeEach(async function() {
      const userOneRegister = createRegisterData(...userOne);
      const userTwoRegister = createRegisterData(...userTwo);
      await User.create(userOneRegister);
      await User.create(userTwoRegister);
    });

    it("returns status code 200", async function() {
      const response = await api
        .delete("/users/1")
        .send({ password: "rightpassword" })
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).to.equal(200);
    });

    it("deletes user", async function() {
      await api
        .delete("/users/1")
        .send({ password: "rightpassword" })
        .set("Authorization", `Bearer ${token}`);
      const response = await api.get("/users");
      expect(response.body).to.have.lengthOf(1);
    });

    it("returns right response format", async function() {
      const response = await api
        .delete("/users/1")
        .send({ password: "rightpassword" })
        .set("Authorization", `Bearer ${token}`);
      expect(response.body).to.have.property("message");
      expect(response.body).to.have.property("status");
    });

    it("ERROR unauthorized returns status code 403", async function() {
      const response = await api
        .delete("/users/1")
        .send({ password: "wrongpassword" })
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).to.equal(403);
    });

    it("ERROR unauthorized returns right error message", async function() {
      const response = await api
        .delete("/users/1")
        .send({ password: "wrongpassword" })
        .set("Authorization", `Bearer ${token}`);
      expect(response.body.error.message).to.equal(
        "You are not authorized to delete this account. Please enter your password."
      );
    });
  });
});
