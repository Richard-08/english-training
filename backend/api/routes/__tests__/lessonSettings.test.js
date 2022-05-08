const request = require("supertest");
const startServer = require("../../../index");

const User = require("../../../data-access/User");
const LessonSettings = require("../../../data-access/LessonSettings");

const { createUser, loginUser } = require("./helpers");
const { USER } = require("./constants");

const API_PREFIX = "/api/settings";
const LESSON_ID = 9999999999999; // ???

describe("API - /settings", () => {
  let server;
  let user;
  let auth;

  beforeEach(async () => {
    try {
      server = await startServer;
      user = await createUser();
      auth = await loginUser();
    } catch (error) {
      throw new Error(error);
    }
  });

  test("PUT / should return updated settings data", async () => {
    const payload = {
      user_id: user.id,
      lesson_id: LESSON_ID,
    };
    const settings = await LessonSettings.createLessonSettings(payload);
    const repetitions = 50;

    const response = await request(server)
      .put(API_PREFIX + "/")
      .set("Authorization", `Token ${auth.token}`)
      .send({
        ...payload,
        repetitions,
      });
    expect(response.status).toEqual(200);
    expect(response.body.lesson_id).toEqual(LESSON_ID);
    expect(response.body.user_id).toEqual(user.id);
    expect(response.body.repetitions).toEqual(repetitions);
  });

  afterEach(async () => {
    try {
      await User.deleteUserByEmail(USER.email);
      await LessonSettings.deleteLessonSettings({
        lesson_id: LESSON_ID,
        user_id: user.id,
      });
    } catch (error) {
      throw new Error(error);
    }
  });
});
