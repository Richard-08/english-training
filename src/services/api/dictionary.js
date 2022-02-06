import service from "./index";

export default {
  getDictionary(payload) {
    return service.dictionary.get("/", payload);
  },
  getDictionaryCategories(payload) {
    return service.dictionary.get("/categories", payload);
  },
  addWord(payload) {
    return service.dictionary.post("/add", payload);
  },
  deleteWord(payload) {
    return service.dictionary.delete("/delete", payload);
  },
  addCategory(payload) {
    return service.dictionary.post("/categories/add", payload);
  },
  deleteCategory(payload) {
    return service.dictionary.post("/categories/delete", payload);
  },
};
