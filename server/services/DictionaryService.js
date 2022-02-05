const User = require("../data-access/User");
const Dictionary = require("../data-access/Dictionary");

class DictionaryService {
  constructor() {}

  async getDictionary(user_id) {
    try {
      let dictionary = await this.getUserDictionary(user_id);
      let categories = await this.getUserCategories(user_id);
      let basic_dictionary = await this.getBasicDictionary();
      let basic_categories = await this.getBasicCategoies();

      return {
        dictionary: [...dictionary, ...basic_dictionary],
        categories: [...categories, ...basic_categories],
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCategories(user_id) {
    try {
      let categories = await this.getUserCategories(user_id);
      let basic_categories = await this.getBasicCategoies();

      return [...categories, ...basic_categories];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  getUserDictionary(user_id) {
    return Dictionary.getDictionary(user_id);
  }

  getBasicDictionary() {
    return Dictionary.getBasicDictionary();
  }

  getUserCategories(user_id) {
    return Dictionary.getCategories(user_id);
  }

  getBasicCategoies() {
    return Dictionary.getBasicCategories();
  }

  async addWord(payload) {
    try {
      const word = await Dictionary.findWordByValues(payload);

      if (word) {
        throw new Error("The word already exists");
      } else {
        const dictionaryRecord = await Dictionary.addWord(payload);
        return dictionaryRecord;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteWord(payload) {
    try {
      const dictionaryRecord = await Dictionary.deleteWord(payload);
      return dictionaryRecord;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  addCategory(payload) {}

  deleteCategory(payload) {}
}

module.exports = new DictionaryService();
