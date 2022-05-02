import service from "./index";

export default {
  getUser(payload) {
    return service.user.get("/", payload);
  },
};
