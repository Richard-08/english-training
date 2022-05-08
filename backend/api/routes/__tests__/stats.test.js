const request = require("supertest");
const startServer = require("../../../index");

const User = require("../../../data-access/User");
const LessonStats = require("../../../data-access/LessonStatistics");
const UserStats = require("../../../data-access/UserStatistics");
const { getFormattedDate } = require("../../../utils/helpers");

const { createUser, loginUser } = require("./helpers");
const { USER } = require("./constants");

const API_PREFIX = "/api/stats";
const LESSON_ID = 9999999999999; // ???

describe("API - /stats", () => {
  let server;
  let user;
  let auth;
  let stats;

  beforeEach(async () => {
    try {
      server = await startServer;
      user = await createUser();
      auth = await loginUser();

      stats = {
        user_id: user.id,
        lesson_id: LESSON_ID,
        started_at: getFormattedDate(new Date()),
        progress: 5,
        last_visit: getFormattedDate(new Date()),
        completed_tasks: 8,
      };
      await LessonStats.createLessonStats(stats);
    } catch (error) {
      throw new Error(error);
    }
  });

  test("PUT / should return updated stats data", async () => {
    const response = await request(server)
      .put(API_PREFIX + "/")
      .set("Authorization", `Token ${auth.token}`)
      .send(stats);
    expect(response.status).toEqual(200);
    expect(response.body.lesson_id).toEqual(LESSON_ID);
    expect(response.body.user_id).toEqual(user.id);
    expect(response.body.progress).toEqual(stats.progress + 1);
    expect(response.body.last_visit).toEqual(stats.last_visit);
    expect(response.body.started_at).toEqual(stats.started_at);
  });

  test("GET /reset should return default stats data", async () => {
    const response = await request(server)
      .get(API_PREFIX + "/reset")
      .set("Authorization", `Token ${auth.token}`)
      .query({ id: LESSON_ID });
    expect(response.status).toEqual(200);
    expect(response.body.lesson_id).toEqual(LESSON_ID);
    expect(response.body.user_id).toEqual(user.id);
    expect(response.body.progress).toEqual(0);
    expect(response.body.last_visit).toEqual(null);
    expect(response.body.started_at).toEqual(stats.started_at);
  });

  test("GET /user should return user stats", async () => {
    const response = await request(server)
      .get(API_PREFIX + "/user")
      .set("Authorization", `Token ${auth.token}`);
    const body = response.body;
    expect(response.status).toEqual(200);

    expect(body.stats).toBeDefined();
    expect(body.stats.today).toBeDefined();
    expect(typeof body.stats.today).toEqual("number");
    expect(body.stats.total).toBeDefined();
    expect(typeof body.stats.total).toEqual("number");
    expect(body.stats.days).toBeDefined();
    expect(typeof body.stats.days).toEqual("number");
    expect(body.stats.record).toBeDefined();
    expect(typeof body.stats.record).toEqual("number");
    expect(body.stats.dates).toBeDefined();
    expect(Array.isArray(body.stats.dates)).toBeTruthy();

    expect(body.week).toBeDefined();
    expect(body.week.labels).toBeDefined();
    expect(Array.isArray(body.week.labels)).toBeTruthy();
    expect(body.week.datasets).toBeDefined();
    expect(Array.isArray(body.week.datasets)).toBeTruthy();

    expect(body.month).toBeDefined();
    expect(body.month.labels).toBeDefined();
    expect(Array.isArray(body.month.labels)).toBeTruthy();
    expect(body.month.datasets).toBeDefined();
    expect(Array.isArray(body.month.datasets)).toBeTruthy();

    expect(body.year).toBeDefined();
    expect(body.year.labels).toBeDefined();
    expect(Array.isArray(body.year.labels)).toBeTruthy();
    expect(body.year.datasets).toBeDefined();
    expect(Array.isArray(body.year.datasets)).toBeTruthy();

    expect(body.total).toBeDefined();
    expect(body.total.labels).toBeDefined();
    expect(Array.isArray(body.total.labels)).toBeTruthy();
    expect(body.total.datasets).toBeDefined();
    expect(Array.isArray(body.total.datasets)).toBeTruthy();

    expect(body.lessons).toBeDefined();
    expect(Array.isArray(body.lessons)).toBeTruthy();
    expect(body.lessons[0].id).toBeDefined();
    expect(body.lessons[0].name).toBeDefined();
    expect(body.lessons[0].category_id).toBeDefined();
    expect(body.lessons[0].user_id).toBeDefined();
    expect(body.lessons[0].progress).toBeDefined();
    expect(body.lessons[0].last_visit).toBeDefined();
    expect(body.lessons[0].started_at).toBeDefined();
    expect(body.lessons[0].repetitions).toBeDefined();
    expect(body.lessons[0].days).toBeDefined();
    expect(body.lessons[0].tasks).toBeDefined();
    expect(body.lessons[0].color).toBeDefined();
  });

  afterEach(async () => {
    try {
      await User.deleteUserByEmail(USER.email);
      await LessonStats.deleteLessonStats({
        lesson_id: LESSON_ID,
        user_id: user.id,
      });
      await UserStats.deleteUserStats({
        lesson_id: LESSON_ID,
        user_id: user.id,
      });
    } catch (error) {
      throw new Error(error);
    }
  });
});
