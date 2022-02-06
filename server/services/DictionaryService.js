const axios = require("axios");
const config = require("../config");
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

  async addWord({ en, ru, category, user_id }) {
    try {
      const user_word = await Dictionary.findUserWord(en, ru, category.id);
      const basic_word = await Dictionary.findBasicWord(en, ru, category.id);

      if (user_word || basic_word) {
        throw new Error("The word already exists");
      } else {
        const isValidWord = await this.validateWord(en, category);

        if (isValidWord) {
          const dictionaryRecord = await Dictionary.addWord({
            en,
            ru,
            category_id: category.id,
            user_id,
          });
          return dictionaryRecord;
        } else {
          throw new Error("Word is invalid");
        }
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

  async addCategory(payload) {
    try {
      const user_category = await Dictionary.findUserCategory(payload.id);
      const basic_category = await Dictionary.findBasicCategory(payload.id);

      if (user_category || basic_category) {
        throw new Error("The category already exists");
      } else {
        const categoryRecord = await Dictionary.addCategory(payload);
        return categoryRecord;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteCategory(payload) {
    try {
      const categoryRecord = await Dictionary.deleteCategory(payload);
      return categoryRecord;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async validateWord(word, category) {
    try {
      if (category.user_id) {
        return true;
      }
      const wordInfo = await this.#findWord(word);
      return wordInfo.def.some(
        (item) => item.pos.toLowerCase() === category.id
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  #findWord(word, lang = "en-ru") {
    return axios
      .get(
        `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${config.YANDEX_API_KEY}&lang=${lang}&text=${word}`
      )
      .then((response) => response.data);
  }
}

module.exports = new DictionaryService();
