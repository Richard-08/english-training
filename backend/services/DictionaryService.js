const axios = require("axios");
const config = require("../config");
const Dictionary = require("../data-access/Dictionary");
const Logger = require("../loaders/logger");

class DictionaryService {
  constructor(Dictionary, Logger) {
    this.dictionaryModel = Dictionary;
    this.logger = Logger;
  }

  async getDictionary(user_id) {
    try {
      let dictionary = await this.dictionaryModel.getDictionary(user_id);
      let categories = await this.dictionaryModel.getCategories(user_id);

      return { dictionary, categories };
    } catch (error) {
      this.logger.error(error);
      throw new Error(error.message);
    }
  }

  async getCategories(user_id) {
    try {
      let categories = await this.dictionaryModel.getCategories(user_id);

      return categories;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error.message);
    }
  }

  async addWord({ en, ru, category, user_id }) {
    try {
      const user_word = await this.dictionaryModel.findUserWord(
        en,
        ru,
        category.id
      );
      const basic_word = await this.dictionaryModel.findBasicWord(
        en,
        ru,
        category.id
      );

      if (user_word || basic_word) {
        throw new Error("The word already exists");
      } else {
        const isValidWord = await this.validateWord(en, category);
        if (isValidWord) {
          const dictionaryRecord = await this.dictionaryModel.addWord({
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
      this.logger.error(error);
      throw new Error(error.message);
    }
  }

  async deleteWord(payload) {
    try {
      const dictionaryRecord = await this.dictionaryModel.deleteWord(payload);
      return dictionaryRecord;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error.message);
    }
  }

  async addCategory(payload) {
    try {
      const user_category = await this.dictionaryModel.findUserCategory(
        payload.name
      );
      const basic_category = await this.dictionaryModel.findBasicCategory(
        payload.name
      );

      if (user_category || basic_category) {
        throw new Error("The category already exists");
      } else {
        const categoryRecord = await this.dictionaryModel.addCategory(payload);
        return categoryRecord;
      }
    } catch (error) {
      this.logger.error(error);
      throw new Error(error.message);
    }
  }

  async deleteCategory(payload) {
    try {
      const categoryRecord = await this.dictionaryModel.deleteCategory(payload);
      return categoryRecord;
    } catch (error) {
      this.logger.error(error);
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
      this.logger.error(error);
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

module.exports = new DictionaryService(Dictionary, Logger);
