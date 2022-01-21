import { request } from "./index";

export default {
  getLessonsData(payload) {
    return request.get("/lessons", payload);
  },
  getLesson(id) {
    return request.get("/lessons/" + id);
  },
  updateLesson(id) {
    return request.get("/lessons/" + id);
  },
};
