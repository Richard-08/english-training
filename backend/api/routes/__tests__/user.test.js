const request = require("supertest");
const startServer = require("../../../index");
const User = require("../../../data-access/User");
const { createUser, loginUser } = require("./helpers");
const { USER } = require("./constants");

const API_PREFIX = "/api/user";

describe("API - user", () => {
  let server;

  beforeEach(async () => {
    try {
      server = await startServer;
    } catch (error) {
      throw new Error(error);
    }
  });

  test("GET /user without token should return access denied", async () => {
    const response = await request(server).get(API_PREFIX + "/");
    expect(response.status).toEqual(401);
    expect(response.body.error).toEqual({ message: "Access denied" });
  });

  test("GET /user with valid token should return user data", async () => {
    const user = await createUser();
    const auth = await loginUser();

    const response = await request(server)
      .get(API_PREFIX + "/")
      .set("Authorization", `Token ${auth.token}`);
    expect(response.status).toEqual(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.username).toEqual(USER.username);
    expect(response.body.email).toEqual(USER.email);
  });

  test("GET /user with invalid token should return error", async () => {
    const response = await request(server)
      .get(API_PREFIX + "/")
      .set("Authorization", `Token invalidtoken01`);
    expect(response.status).toEqual(400);
    expect(response.body.error).toEqual({ message: "Invalid credentials" });
  });

  test("DELETE /user existing user should return success", async () => {
    const user = await createUser();
    const auth = await loginUser();

    const response = await request(server)
      .delete(API_PREFIX + "/")
      .set("Authorization", `Token ${auth.token}`);
    expect(response.status).toEqual(200);
  });

  test("DELETE /user with invalid token should return error", async () => {
    const response = await request(server)
      .delete(API_PREFIX + "/")
      .set("Authorization", `Token invalidtoken01`);
    expect(response.status).toEqual(400);
    expect(response.body.error).toEqual({ message: "Invalid credentials" });
  });

  afterEach(async () => {
    try {
      await User.deleteUserByEmail(USER.email);
    } catch (error) {
      throw new Error(error);
    }
  });
});
