import service from "./index";

export default {
  getLessonsData(payload) {
    return service.lessons.get("/", payload);
  },
  getLesson(payload) {
    return service.lessons.get("/", payload);
  },
  updateLesson(id) {
    return service.lessons.get("/" + id);
  },
};
