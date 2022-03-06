import service from "./index";

export default {
  getLessonsData(payload) {
    return service.lessons.get("/", payload);
  },
  getLesson(id, payload) {
    return service.lessons.get("/" + id, payload);
  },
  updateStats(payload) {
    return service.lessons.put("/", payload);
  },
};
