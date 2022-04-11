import LS from "../../utils/LocalStorageService";

const KEY = "theme";

export default {
  get() {
    return LS.get(KEY);
  },

  set(payload) {
    LS.set(KEY, payload);
  },

  clear() {
    LS.remove(KEY);
  },
};
