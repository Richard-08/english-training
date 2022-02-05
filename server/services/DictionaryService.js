const User = require("../data-access/User");
const Dictionary = require("../data-access/Dictionary");

class DictionaryService {
  constructor() {}

  async getDictionary() {
    try {
      let dictionary = await this.getUserDictionary();
      let categories = await this.getUserCategories();
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

  getUserDictionary() {
    return Dictionary.getDictionary();
  }

  getBasicDictionary() {
    return Dictionary.getBasicDictionary();
  }

  getUserCategories() {
    return Dictionary.getCategories();
  }

  getBasicCategoies() {
    return Dictionary.getBasicCategories();
  }
}

module.exports = new DictionaryService();
