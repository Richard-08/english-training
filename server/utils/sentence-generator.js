const PRONOUNS = [
  {
    en: "i",
    ru: "я",
  },
  {
    en: "you",
    ru: "ты",
  },
  {
    en: "we",
    ru: "мы",
  },
  {
    en: "they",
    ru: "они",
  },
  {
    en: "he",
    ru: "он",
  },
  {
    en: "she",
    ru: "она",
  },
];

const GRAMMAR = [
  {
    id: "future",
    forms: [
      {
        id: "question",
        en_1: "will",
      },
      {
        id: "statement",
        en_1: "will",
      },
      {
        id: "negation",
        en_1: "will not",
      },
    ],
  },
  {
    id: "present",
    forms: [
      {
        id: "question",
        en_1: "do",
        en_2: "does",
      },
      {
        id: "statement",
        en_1: "",
        ending: "s",
      },
      {
        id: "negation",
        en_1: "don't",
        en_2: "doesn't",
      },
    ],
  },
  {
    id: "past",
    forms: [
      {
        id: "question",
        en_1: "did",
      },
      {
        id: "statement",
        en_1: "",
        ending: "ed",
      },
      {
        id: "negation",
        en_1: "didn't",
      },
    ],
  },
];

const RU_ENDINGS = ["ть", "ться"];
const RU_VOWELS = ["а", "о", "у", "и", "ы", "э", "е", "ё", "ю", "я"];
const EN_VOWELS = ["a", "e", "i", "o", "u", "y"];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function isInThirdPerson(pronoun) {
  return (
    pronoun === "he" ||
    pronoun === "she" ||
    pronoun === "она" ||
    pronoun === "он" ||
    pronoun === "они"
  );
}

function isInSecondPerson(pronoun) {
  return pronoun === "ты";
}

function isInFirstPerson(pronoun) {
  return pronoun === "я" || pronoun === "мы";
}

function isPlural(pronoun) {
  return pronoun === "мы" || pronoun === "они";
}

function cutWordEnding(word, endings) {
  let result = word;
  for (let i = 0; i < endings.length; i += 1) {
    let end = endings[i];
    if (word.endsWith(endings[i])) {
      result = result.slice(0, result.length - end.length);
      break;
    }
  }
  return result;
}

function isVowel(char, lang) {
  if (lang === "ru") {
    return RU_VOWELS.includes(char);
  } else if (lang === "en") {
    return EN_VOWELS.includes(char);
  }
}

function formatToPastRU(word, pronoun) {
  if (isPlural(pronoun)) {
    return word + "ли";
  } else {
    if (pronoun === "она") {
      return word + "ла";
    } else {
      return word + "л";
    }
  }
}

function formatToPresentRU(word, pronoun) {
  let last_char = word[word.length - 1];
  if (isPlural(pronoun)) {
    if (isInFirstPerson(pronoun)) {
      return word + "ем";
    } else if (isInSecondPerson(pronoun)) {
      return word + "ете";
    } else {
      return word + (isVowel(last_char, "ru") ? "ют" : "ут");
    }
  } else {
    if (isInFirstPerson(pronoun)) {
      return word + (isVowel(last_char, "ru") ? "ю" : "у");
    } else if (isInSecondPerson(pronoun)) {
      return word + "ешь";
    } else {
      return word + "ет";
    }
  }
}

function formatToFutureRU(word, pronoun) {
  if (isPlural(pronoun)) {
    if (isInFirstPerson(pronoun)) {
      return "будем " + word;
    } else if (isInSecondPerson(pronoun)) {
      return "будете " + word;
    } else {
      return "будут " + word;
    }
  } else {
    if (isInFirstPerson(pronoun)) {
      return "буду " + word;
    } else if (isInSecondPerson(pronoun)) {
      return "будешь " + word;
    } else {
      return "будет " + word;
    }
  }
}

function getFormattedWordRU(time, word, pronoun) {
  let formatted_word = cutWordEnding(word, RU_ENDINGS);
  if (time === "past") {
    return formatToPastRU(formatted_word, pronoun);
  } else if (time === "present") {
    return formatToPresentRU(formatted_word, pronoun);
  } else {
    return formatToFutureRU(word, pronoun);
  }
}

function getFormattedWordEN(time, word, form, pronoun) {
  if (form.id === "statement") {
    let last_char = word[word.length - 1];

    if (time === "present") {
      if (isInThirdPerson(pronoun)) {
        const special_endings = ["h", "s", "x", "z"];
        if (special_endings.includes(last_char)) {
          return word + "es";
        }
        return word + "s";
      }
      return word;
    } else if (time === "past") {
      let result;
      switch (last_char) {
        case "e":
          result = word + "d";
          break;
        case "y":
          result = word + "ied";
          break;
        case "l":
          result = word + "led";
          break;

        default:
          result = word + "ed";
          break;
      }

      return result;
    }
  }

  return word;
}

function getQuestionForm(pronoun, form, word) {
  return {
    en: `${isInThirdPerson(pronoun.en) && form.en_2 ? form.en_2 : form.en_1} ${
      pronoun.en
    } ${word.en}?`,
    ru: `${pronoun.ru} ${word.ru}?`,
  };
}

function getStatementForm(pronoun, form, word) {
  return {
    en: `${pronoun.en} ${form.en_1}${form.en_1 ? " " : ""}${word.en}`,
    ru: `${pronoun.ru} ${word.ru}`,
  };
}

function getNegationForm(pronoun, form, word) {
  return {
    en: `${pronoun.en} ${
      isInThirdPerson(pronoun.en) && form.en_2 ? form.en_2 : form.en_1
    } ${word.en}`,
    ru: `${pronoun.ru} не ${word.ru}`,
  };
}

function sentenceConstructor(time, form, word) {
  const index = getRandomNumber(0, PRONOUNS.length - 1);
  const pronoun = PRONOUNS[index];

  const formatted_word = {
    ru: getFormattedWordRU(time, word.ru, pronoun.ru),
    en: getFormattedWordEN(time, word.en, form, pronoun.en),
  };

  if (form.id === "question") {
    return getQuestionForm(pronoun, form, formatted_word);
  } else if (form.id === "statement") {
    return getStatementForm(pronoun, form, formatted_word);
  } else {
    return getNegationForm(pronoun, form, formatted_word);
  }
}

function sentenceGenerator(data) {
  return data.reduce((total, word) => {
    GRAMMAR.forEach((time) => {
      time.forms.forEach((form) => {
        const sentence = sentenceConstructor(time.id, form, word);
        total.push(sentence);
      });
    });
    return total;
  }, []);
}

module.exports = sentenceGenerator;
