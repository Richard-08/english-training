import service from "./index";

export default {
  updateSettings(payload) {
    return service.settings.put("/", payload);
  },
};
