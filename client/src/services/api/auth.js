import service from "./index";

export default {
  register(payload) {
    return service.auth.post("/register", payload);
  },
  login(payload) {
    return service.auth.post("/login", payload);
  },
  logout(payload) {
    return service.auth.post("/logout", payload);
  },
  getUser(payload) {
    return service.auth.get("/user", payload);
  },
};
