const PRONOUNS_1 = "I, YOU, WE, THEY";
const PRONOUNS_2 = "HE, SHE";

export default [
  {
    time: "FUTURE",
    question: [
      {
        prefix: "WILL",
        pronoun: `${PRONOUNS_1}, ${PRONOUNS_2}`,
        verb: "LIVE",
      },
    ],
    statement: [
      {
        prefix: "WILL",
        pronoun: `${PRONOUNS_1}, ${PRONOUNS_2}`,
        verb: "LIVE",
      },
    ],
    negation: [
      {
        prefix: "WILL NOT",
        pronoun: `${PRONOUNS_1}, ${PRONOUNS_2}`,
        verb: "LIVE",
      },
    ],
  },
  {
    time: "PRESENT",
    question: [
      {
        prefix: "DO",
        pronoun: PRONOUNS_1,
        verb: "LIVE",
      },
      {
        prefix: "DOES",
        pronoun: PRONOUNS_2,
        verb: "LIVE",
      },
    ],
    statement: [
      {
        pronoun: PRONOUNS_1,
        verb: "LIVE",
      },
      {
        pronoun: PRONOUNS_2,
        verb: "LIVES",
      },
    ],
    negation: [
      {
        prefix: "DON'T",
        pronoun: PRONOUNS_1,
        verb: "LIVE",
      },
      {
        prefix: "DOESN'T",
        pronoun: PRONOUNS_2,
        verb: "LIVE",
      },
    ],
  },
  {
    time: "PAST",
    question: [
      {
        prefix: "DID",
        pronoun: `${PRONOUNS_1}, ${PRONOUNS_2}`,
        verb: "LIVE",
      },
    ],
    statement: [
      {
        pronoun: `${PRONOUNS_1}, ${PRONOUNS_2}`,
        verb: "LIVED",
      },
    ],
    negation: [
      {
        prefix: "DID NOT",
        pronoun: `${PRONOUNS_1}, ${PRONOUNS_2}`,
        verb: "LIVE",
      },
    ],
  },
];
