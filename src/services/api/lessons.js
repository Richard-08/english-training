import service from "./index";

export default {
  getLessonsData(payload) {
    return service.lessons.get("/", payload);
  },
  getLesson(id, payload) {
    return service.lessons.get("/" + id, payload);
  },
  updateLesson(id) {
    return service.lessons.get("/" + id);
  },
};
