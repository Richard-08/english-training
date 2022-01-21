import { request } from "./index";

export default {
  register(payload) {
    return request.post("/auth/register", payload);
  },
  login(payload) {
    return request.post("/auth/login", payload);
  },
  logout(payload) {
    return request.post("/auth/logout", payload);
  },
  getUser(payload) {
    return request.get("/auth/user", payload);
  },
};
