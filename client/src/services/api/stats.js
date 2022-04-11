import service from "./index";

export default {
  updateStats(payload) {
    return service.stats.put("/", payload);
  },
  resetProgress(payload) {
    return service.stats.get("/reset", payload);
  },
  getUserStats(payload) {
    return service.stats.get("/user", payload);
  },
};
