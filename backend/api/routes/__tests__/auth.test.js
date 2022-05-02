const request = require("supertest");
const startServer = require("../../../index");
const User = require("../../../data-access/User");

const PREFIX = "/api/auth";
const USER = {
  username: "Username",
  email: "test@mail.com",
  password: "password",
};

describe("API - auth", () => {
  test("POST /register should return registered USER and TOKEN", async () => {
    try {
      const server = await startServer;
      const response = await request(server)
        .post(PREFIX + "/register")
        .send(USER);
      expect(response.status).toEqual(201);
      expect(response.body.user.id).toBeDefined();
      expect(response.body.user.username).toEqual(USER.username);
      expect(response.body.user.email).toEqual(USER.email);
      expect(response.body.token).toBeDefined();
      expect(typeof response.body.token).toBe("string");
    } catch (error) {
      throw new Error(error);
    }
  });

  test("POST /register with an existing email should return a warning", async () => {
    try {
      const server = await startServer;
      const response = await request(server)
        .post(PREFIX + "/register")
        .send(USER);
      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual({
        message: "The user with the given email already exists",
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  test("POST /login with existing access should return USER and TOKEN", async () => {
    try {
      const server = await startServer;
      const response = await request(server)
        .post(PREFIX + "/login")
        .send(USER);
      expect(response.status).toEqual(200);
      expect(response.body.user.id).toBeDefined();
      expect(response.body.user.username).toEqual(USER.username);
      expect(response.body.user.email).toEqual(USER.email);
      expect(response.body.token).toBeDefined();
      expect(typeof response.body.token).toBe("string");
    } catch (error) {
      throw new Error(error);
    }
  });

  test("POST /login with wrong password should return an error", async () => {
    try {
      const server = await startServer;
      const response = await request(server)
        .post(PREFIX + "/login")
        .send({
          email: "test@mail.com",
          password: "wrongpassword",
        });
      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual({ message: "Invalid password" });
    } catch (error) {
      throw new Error(error);
    }
  });

  test("POST /login with non-existent access should return an error", async () => {
    try {
      const server = await startServer;
      const response = await request(server)
        .post(PREFIX + "/login")
        .send({
          email: "example@mail.com",
          password: "password",
        });
      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual({
        message: "User with this email does not exist",
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  afterAll(async () => {
    try {
      await User.deleteUserByEmail(USER.email);
    } catch (error) {
      throw new Error(error);
    }
  });
});
