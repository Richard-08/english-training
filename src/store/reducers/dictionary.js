import {
  GET_DICTIONARY,
  GET_CATEGORIES,
  ADD_WORD,
  DELETE_WORD,
} from "../actions/types";

const initialState = {
  dictionary: [],
  categories: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DICTIONARY:
      return {
        ...state,
        dictionary: action.payload,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case ADD_WORD:
      return {
        ...state,
        dictionary: [...state.dictionary, action.payload],
      };
    case DELETE_WORD:
      return {
        ...state,
        dictionary: state.dictionary.filter(
          (word) => word.id !== action.payload
        ),
      };

    default:
      return state;
  }
}
