const request = require("supertest");
const startServer = require("../../../index");

const User = require("../../../data-access/User");
const Dictionary = require("../../../data-access/Dictionary");

const { createUser, loginUser } = require("./helpers");
const { USER } = require("./constants");

const API_PREFIX = "/api/dictionary";

const TEST_WORD = {
  en: "test",
  ru: "test",
};
const TEST_CATEGORY = "testcategory";

describe("API - /dictionary", () => {
  let server;
  let user;
  let auth;
  let category;
  let word;

  beforeEach(async () => {
    try {
      server = await startServer;
      user = await createUser();
      auth = await loginUser();
    } catch (error) {
      throw new Error(error);
    }
  });

  test("GET / without token should return access denied", async () => {
    const response = await request(server).get(API_PREFIX + "/");
    expect(response.status).toEqual(401);
    expect(response.body.error).toEqual({ message: "Access denied" });
  });

  test("GET / with valid token should return dictionary data", async () => {
    const response = await request(server)
      .get(API_PREFIX + "/")
      .set("Authorization", `Token ${auth.token}`);
    expect(response.status).toEqual(200);
    expect(response.body.dictionary).toBeDefined();
    expect(Array.isArray(response.body.dictionary)).toBeTruthy();
    expect(response.body.categories).toBeDefined();
    expect(Array.isArray(response.body.categories)).toBeTruthy();
  });

  test("POST /add should return word id", async () => {
    try {
      category = await Dictionary.addCategory({
        name: TEST_CATEGORY,
        user_id: user.id,
      });

      const response = await request(server)
        .post(API_PREFIX + "/add")
        .set("Authorization", `Token ${auth.token}`)
        .send({
          user_id: user.id,
          category: {
            ...category,
            user_id: user.id,
          },
          ...TEST_WORD,
        });
      word = response.body;
      expect(response.status).toEqual(200);
      expect(response.body.id).toBeDefined();
    } catch (error) {
      throw new Error(error.message);
    }
  });

  test("DELETE /delete should return success", async () => {
    try {
      category = await Dictionary.addCategory({
        name: TEST_CATEGORY,
        user_id: user.id,
      });

      const word = await Dictionary.addWord({
        user_id: user.id,
        category_id: category.id,
        ...TEST_WORD,
      });
      const response = await request(server)
        .delete(API_PREFIX + "/delete")
        .set("Authorization", `Token ${auth.token}`)
        .send({ user_id: user.id, id: word.id });
      expect(response.status).toEqual(200);
    } catch (error) {
      throw new Error(error.message);
    }
  });

  test("GET /categories should return categories data", async () => {
    const response = await request(server)
      .get(API_PREFIX + "/")
      .set("Authorization", `Token ${auth.token}`);
    expect(response.status).toEqual(200);
    expect(response.body.categories).toBeDefined();
    expect(Array.isArray(response.body.categories)).toBeTruthy();
  });

  test("POST /categories/add should return category id", async () => {
    try {
      const response = await request(server)
        .post(API_PREFIX + "/categories/add")
        .set("Authorization", `Token ${auth.token}`)
        .send({
          name: TEST_CATEGORY,
          user_id: user.id,
        });
      category = response.body;
      expect(response.status).toEqual(200);
      expect(response.body.id).toBeDefined();
    } catch (error) {
      throw new Error(error.message);
    }
  });

  test("DELETE /categories/delete should return success", async () => {
    try {
      category = await Dictionary.addCategory({
        name: TEST_CATEGORY,
        user_id: user.id,
      });

      const response = await request(server)
        .delete(API_PREFIX + "/categories/delete")
        .set("Authorization", `Token ${auth.token}`)
        .send({ user_id: user.id, id: category.id });
      expect(response.status).toEqual(200);
    } catch (error) {
      throw new Error(error.message);
    }
  });

  afterEach(async () => {
    try {
      await User.deleteUserByEmail(USER.email);
      if (category && category.id) {
        await Dictionary.deleteCategory({ id: category.id, user_id: user.id });
      }
      if (word && word.id) {
        await Dictionary.deleteWord({ user_id: user.id, word_id: word.id });
      }
    } catch (error) {
      throw new Error(error);
    }
  });
});
