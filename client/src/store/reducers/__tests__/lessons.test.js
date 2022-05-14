import {
  GET_LESSONS,
  GET_LESSON,
  UPDATE_LESSON_STATS,
  RESET_PROGRESS,
  UPDATE_LESSON_SETTINGS,
} from "../../actions/types";
import reducer from "../lessons";

const LESSONS = {
  lessons: [
    {
      id: 1,
      name: "Present/Past/Future Simple",
      category_id: 1,
      stats: {
        lesson_id: 1,
        user_id: 1,
        progress: 1,
        last_visit: "2022-05-07",
        started_at: "05.04.2022",
      },
      settings: { lesson_id: 1, user_id: 1, repetitions: 25 },
    },
    {
      id: 2,
      name: "a/an, some, the",
      category_id: 2,
      stats: {
        lesson_id: 2,
        user_id: 1,
        progress: 1,
        last_visit: "2022-05-07",
        started_at: "2022-04-09",
      },
      settings: { lesson_id: 2, user_id: 1, repetitions: 15 },
    },
    {
      id: 3,
      name: "this/that, these/those",
      category_id: 2,
      stats: {
        lesson_id: 3,
        user_id: 1,
        progress: 0,
        last_visit: null,
        started_at: "2022-04-09",
      },
      settings: { lesson_id: 3, user_id: 1, repetitions: 20 },
    },
    {
      id: 4,
      name: "my, your, his, her, its, our, their",
      category_id: 2,
      stats: {
        lesson_id: 4,
        user_id: 1,
        progress: 0,
        last_visit: null,
        started_at: "2022-04-09",
      },
      settings: { lesson_id: 4, user_id: 1, repetitions: 20 },
    },
  ],
  categories: [
    { id: 1, name: "Tenses" },
    { id: 2, name: "Determiners" },
  ],
};

const initialState = {
  data: {
    lessons: [],
    categories: [],
  },
  currentLessons: [],
};

test("Should return default state", () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

test("Should return lessons data", () => {
  expect(
    reducer(initialState, { type: GET_LESSONS, payload: LESSONS }).data
  ).toEqual(LESSONS);
});

test("Should return lesson data and updated currentLessons", () => {
  expect(
    reducer(initialState, { type: GET_LESSON, payload: LESSONS.lessons[0] })
      .currentLessons
  ).toContainEqual(LESSONS.lessons[0]);
});

test("Should lesson stats updated", () => {
  const payload = {
    lesson_id: 1,
    user_id: 1,
    progress: 20,
    last_visit: "2022-05-10",
    started_at: "05.04.2022",
  };
  let response = reducer(
    { data: LESSONS },
    {
      type: UPDATE_LESSON_STATS,
      payload,
    }
  );
  let lesson = response.data.lessons.find(
    (lesson) => lesson.id === payload.lesson_id
  );
  expect(lesson.stats.lesson_id).toEqual(payload.lesson_id);
  expect(lesson.user_id).toEqual(payload.user_id);
  expect(lesson.progress).toEqual(payload.progress);
  expect(lesson.last_visit).toEqual(payload.last_visit);
  expect(lesson.started_at).toEqual(payload.started_at);
});

test("Should reset lesson stat", () => {
  const payload = {
    lesson_id: 1,
    user_id: 1,
    progress: 0,
    last_visit: "2022-05-10",
    started_at: "05.04.2022",
  };
  let response = reducer(
    { data: LESSONS, currentLessons: [LESSONS.lessons[0]] },
    {
      type: RESET_PROGRESS,
      payload,
    }
  );
  let lesson = response.data.lessons.find(
    (lesson) => lesson.id === payload.lesson_id
  );

  let currentLesson = response.currentLessons.find(
    (lesson) => lesson.id === payload.lesson_id
  );

  expect(lesson.stats.lesson_id).toEqual(payload.lesson_id);
  expect(lesson.stats.user_id).toEqual(payload.user_id);
  expect(lesson.stats.progress).toEqual(payload.progress);
  expect(lesson.stats.last_visit).toEqual(payload.last_visit);
  expect(lesson.stats.started_at).toEqual(payload.started_at);

  expect(currentLesson.stats.lesson_id).toEqual(payload.lesson_id);
  expect(currentLesson.stats.user_id).toEqual(payload.user_id);
  expect(currentLesson.stats.progress).toEqual(payload.progress);
  expect(currentLesson.stats.last_visit).toEqual(payload.last_visit);
  expect(currentLesson.stats.started_at).toEqual(payload.started_at);
});

test("Should update lesson setting", () => {
  const payload = {
    lesson_id: 1,
    user_id: 1,
    repetitions: 100,
  };
  let response = reducer(
    { data: LESSONS, currentLessons: [LESSONS.lessons[0]] },
    {
      type: UPDATE_LESSON_SETTINGS,
      payload,
    }
  );
  let lesson = response.data.lessons.find(
    (lesson) => lesson.id === payload.lesson_id
  );

  let currentLesson = response.currentLessons.find(
    (lesson) => lesson.id === payload.lesson_id
  );

  expect(lesson.settings.lesson_id).toEqual(payload.lesson_id);
  expect(lesson.settings.user_id).toEqual(payload.user_id);
  expect(lesson.settings.repetitions).toEqual(payload.repetitions);

  expect(currentLesson.settings.lesson_id).toEqual(payload.lesson_id);
  expect(currentLesson.settings.user_id).toEqual(payload.user_id);
  expect(currentLesson.settings.repetitions).toEqual(payload.repetitions);
});
