const bcrypt = require("bcrypt");
const request = require("supertest");
const startServer = require("../../../index");
const User = require("../../../data-access/User");
const AuthService = require("../../../services/AuthService");

const API_PREFIX = "/api/user";
const USER = {
  username: "Username",
  email: "test@mail.com",
  password: "password",
};

describe("API - user", () => {
  let user;
  let auth;

  beforeEach(async () => {
    try {
      const server = await startServer;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(USER.password, salt);
      user = await User.create({
        ...USER,
        password: hashedPassword,
      });

      auth = await AuthService.signIn(USER.email, USER.password);
    } catch (error) {
      throw new Error(error);
    }
  });

  test("GET /user should return access denied", async () => {
    const server = await startServer;
    const response = await request(server).get(API_PREFIX + "/");
    expect(response.status).toEqual(401);
    expect(response.body.error).toEqual({ message: "Access denied" });
  });

  test("GET /user should return user data", async () => {
    const server = await startServer;
    const response = await request(server)
      .get(API_PREFIX + "/")
      .set("Authorization", `Token ${auth.token}`);
    expect(response.status).toEqual(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.username).toEqual(USER.username);
    expect(response.body.email).toEqual(USER.email);
  });

  afterEach(async () => {
    try {
      await User.deleteUserByEmail(USER.email);
    } catch (error) {
      throw new Error(error);
    }
  });
});
