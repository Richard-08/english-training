function sentenceDivider(sentence, dividers) {
  const regexp = new RegExp(`\\b(${dividers.join("|")})\\b`, "gi");
  return sentence
    .split(regexp)
    .filter((str) => Boolean(str))
    .map((str) => {
      if (dividers.includes(str.toLowerCase())) {
        return {
          type: "divider",
          value: str,
        };
      }
      return {
        type: "text",
        value: str,
      };
    });
}

module.exports = sentenceDivider;
