import service from "./index";

export default {
  getLessonsData(payload) {
    return service.lessons.get("/", payload);
  },
  getLesson(id) {
    return service.lessons.get("/" + id);
  },
  updateLesson(id) {
    return service.lessons.get("/" + id);
  },
};
