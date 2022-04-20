const sentenceDivider = require("../sentence-divider");

test("Should return splitted sentence", () => {
  const str = "We`re planning a holiday. We`ll probably go to the sea.";
  const dividers = ["a", "an", "the", "some"];
  const result = [
    {
      type: "text",
      value: "We`re planning ",
    },
    {
      type: "option",
      value: "a",
    },
    {
      type: "text",
      value: " holiday. We`ll probably go to ",
    },
    {
      type: "option",
      value: "the",
    },
    {
      type: "text",
      value: " sea.",
    },
  ];
  expect(sentenceDivider(str, dividers)).toEqual(result);
});

test("Should return splitted sentence", () => {
  const str = "The students are waiting for the lesson to start";
  const dividers = ["a", "an", "the", "some"];
  const result = [
    {
      type: "option",
      value: "The",
    },
    {
      type: "text",
      value: " students are waiting for ",
    },
    {
      type: "option",
      value: "the",
    },
    {
      type: "text",
      value: " lesson to start",
    },
  ];

  expect(sentenceDivider(str, dividers)).toEqual(result);
});

test("Should return splitted sentence", () => {
  const str = "Look at that big cloud.";
  const dividers = ["a", "an", "the", "some"];
  const result = [
    {
      type: "text",
      value: "Look at that big cloud.",
    },
  ];

  expect(sentenceDivider(str, dividers)).toEqual(result);
});
