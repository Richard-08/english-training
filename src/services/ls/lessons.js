import LS from "../../utils/LocalStorageService";

const KEY = "lessons";

export default {
  get lessons() {
    return LS.get(KEY) || [];
  },

  get(id) {
    return this.lessons.find((item) => item.id === id);
  },

  set(payload) {
    let lessons = this.lessons;

    if (lessons.find((item) => item.id === payload.id)) {
      lessons = lessons.map((item) => {
        if (item.id === payload.id) {
          return {
            ...item,
            ...payload,
          };
        }
        return item;
      });
    } else {
      lessons.push(payload);
    }

    LS.set(KEY, lessons);
  },

  remove(id) {
    LS.set(
      KEY,
      this.lessons.filter((item) => item.id !== id)
    );
  },

  clear() {
    LS.remove(KEY);
  },
};
