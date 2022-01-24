import { request } from "./index";

export default {
  getDictionary(payload) {
    return request.get("/dictionary", payload);
  },
  getDictionaryCategories(payload) {
    return request.get("/dictionary/categories", payload);
  },
  addWord(payload) {
    return request.post("/dictionary/add", payload);
  },
  deleteWord(payload) {
    return request.delete("/dictionary/delete", payload);
  },
};
