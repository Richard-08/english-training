const sentenceGenerator = require("../sentence-generator");

const en_pronouns_regex = "i|you|we|they|he|she";
const ru_pronouns_regex = "я|ты|мы|они|он|она";

const ru_auxiliary = "буду|будешь|будем|будут|будет|будет";

const present_auxiliary = "do|does";
const negation_present_auxiliary = "don't|doesn't";

const test_word = [
  {
    en: "inspire",
    ru: "вдохновлять",
  },
];

const DATA = sentenceGenerator(test_word);

describe("Future form sentence", () => {
  test("Should return FUTURE-QUESTION form", () => {
    let ru_regex = new RegExp(
      `(${ru_pronouns_regex})\\s(${ru_auxiliary})\\s([а-яА-Я]+)\\?$`
    );
    let en_regex = new RegExp(`will\\s(${en_pronouns_regex})\\s(\\w+)\\?$`);

    let ru = DATA[0].ru;
    let en = DATA[0].en;

    expect(ru).toMatch(ru_regex);
    expect(en).toMatch(en_regex);
  });

  test("Should return FUTURE-STATEMENT form", () => {
    let ru_regex = new RegExp(
      `(${ru_pronouns_regex})\\s(${ru_auxiliary})\\s([а-яА-Я]+)`
    );
    let en_regex = new RegExp(`(${en_pronouns_regex})\\s\will\\s(\\w+)`);

    let ru = DATA[1].ru;
    let en = DATA[1].en;

    expect(ru).toMatch(ru_regex);
    expect(en).toMatch(en_regex);
  });

  test("Should return FUTURE-NEGATION form", () => {
    let ru_regex = new RegExp(
      `(${ru_pronouns_regex})\\s\не\\s(${ru_auxiliary})\\s([а-яА-Я]+)`
    );
    let en_regex = new RegExp(`(${en_pronouns_regex})\\s\will\\snot\\s(\\w+)`);

    let ru = DATA[2].ru;
    let en = DATA[2].en;

    expect(ru).toMatch(ru_regex);
    expect(en).toMatch(en_regex);
  });
});

describe("Present form sentence", () => {
  test("Should return PRESENT-QUESTION form", () => {
    let ru_regex = new RegExp(`(${ru_pronouns_regex})\\s([а-яА-Я]+)\\?$`);
    let en_regex = new RegExp(
      `(${present_auxiliary})\\s(${en_pronouns_regex})\\s(\\w+)\\?$`
    );

    let ru = DATA[3].ru;
    let en = DATA[3].en;

    expect(ru).toMatch(ru_regex);
    expect(en).toMatch(en_regex);
  });

  test("Should return PRESENT-STATEMENT form", () => {
    let ru_regex = new RegExp(`(${ru_pronouns_regex})\\s([а-яА-Я]+)`);
    let en_regex = new RegExp(`(${en_pronouns_regex})\\s(\\w+)`);

    let ru = DATA[4].ru;
    let en = DATA[4].en;

    expect(ru).toMatch(ru_regex);
    expect(en).toMatch(en_regex);
  });

  test("Should return PRESENT-NEGATION form", () => {
    let ru_regex = new RegExp(`(${ru_pronouns_regex})\\s\не\\s([а-яА-Я]+)`);
    let en_regex = new RegExp(
      `(${en_pronouns_regex})\\s(${negation_present_auxiliary})\\s(\\w+)`
    );

    let ru = DATA[5].ru;
    let en = DATA[5].en;

    expect(ru).toMatch(ru_regex);
    expect(en).toMatch(en_regex);
  });
});

describe("Past form sentence", () => {
  test("Should return PAST-QUESTION form", () => {
    let ru_regex = new RegExp(`(${ru_pronouns_regex})\\s([а-яА-Я]+)\\?$`);
    let en_regex = new RegExp(`did\\s(${en_pronouns_regex})\\s(\\w+)\\?$`);

    let ru = DATA[6].ru;
    let en = DATA[6].en;

    expect(ru).toMatch(ru_regex);
    expect(en).toMatch(en_regex);
  });

  test("Should return PAST-STATEMENT form", () => {
    let ru_regex = new RegExp(`(${ru_pronouns_regex})\\s([а-яА-Я]+)`);
    let en_regex = new RegExp(`(${en_pronouns_regex})\\s(\\w+)`);

    let ru = DATA[7].ru;
    let en = DATA[7].en;

    expect(ru).toMatch(ru_regex);
    expect(en).toMatch(en_regex);
  });

  test("Should return PAST-NEGATION form", () => {
    let ru_regex = new RegExp(`(${ru_pronouns_regex})\\s\не\\s([а-яА-Я]+)`);
    let en_regex = new RegExp(`(${en_pronouns_regex})\\sdidn't\\s(\\w+)`);

    let ru = DATA[8].ru;
    let en = DATA[8].en;

    expect(ru).toMatch(ru_regex);
    expect(en).toMatch(en_regex);
  });
});
