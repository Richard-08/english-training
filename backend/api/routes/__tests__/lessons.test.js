const request = require("supertest");
const startServer = require("../../../index");

const User = require("../../../data-access/User");
const Lessons = require("../../../data-access/Lesson");
const LessonSettings = require("../../../data-access/LessonSettings");
const LessonStats = require("../../../data-access/LessonStatistics");

const { createUser, loginUser } = require("./helpers");
const { USER } = require("./constants");

const API_PREFIX = "/api/lessons";

describe("API - /lessons", () => {
  let server;
  let user;
  let auth;
  let lesson;

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

  test("GET / should return lessons data", async () => {
    const response = await request(server)
      .get(API_PREFIX + "/")
      .set("Authorization", `Token ${auth.token}`);
    expect(response.status).toEqual(200);
    expect(response.body.lessons).toBeDefined();
    expect(Array.isArray(response.body.lessons)).toBeTruthy();
    expect(response.body.categories).toBeDefined();
    expect(Array.isArray(response.body.categories)).toBeTruthy();
  });

  test("GET /:id without token should return access denied", async () => {
    const response = await request(server).get(API_PREFIX + "/");
    expect(response.status).toEqual(401);
    expect(response.body.error).toEqual({ message: "Access denied" });
  });

  test("GET /:id should return lessons data", async () => {
    const lessons = await Lessons.getAll();
    lesson = lessons[0];

    const response = await request(server)
      .get(API_PREFIX + "/" + lesson.id)
      .set("Authorization", `Token ${auth.token}`);
    const body = response.body;

    expect(response.status).toEqual(200);
    expect(body.id).toEqual(lesson.id);
    expect(body.name).toBeDefined();
    expect(body.category_id).toBeDefined();
    expect(body.practice).toBeDefined();
    expect(typeof body.practice).toBeTruthy();

    expect(body.stats).toBeDefined();
    expect(body.stats.lesson_id).toBeDefined();
    expect(body.stats.lesson_id).toEqual(lesson.id);
    expect(body.stats.user_id).toBeDefined();
    expect(body.stats.user_id).toEqual(user.id);
    expect(body.stats.progress).toBeDefined();
    expect(body.stats.last_visit).toBeDefined();
    expect(body.stats.started_at).toBeDefined();

    expect(body.settings).toBeDefined();
    expect(body.settings.lesson_id).toEqual(lesson.id);
    expect(body.settings.user_id).toEqual(user.id);
    expect(body.settings.repetitions).toBeDefined();
  });

  afterEach(async () => {
    try {
      await User.deleteUserByEmail(USER.email);

      if (lesson && lesson.id) {
        await LessonSettings.deleteLessonSettings({
          lesson_id: lesson.id,
          user_id: user.id,
        });

        await LessonStats.deleteLessonStats({
          lesson_id: lesson.id,
          user_id: user.id,
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  });
});
