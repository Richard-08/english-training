import {
  GET_DICTIONARY,
  GET_CATEGORIES,
  ADD_WORD,
  DELETE_WORD,
  ADD_CATEGORY,
  DELETE_CATEGORY,
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
        dictionary: action.payload.dictionary,
        categories: action.payload.categories,
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
        dictionary: state.dictionary.filter((word) =>
          word.user_id ? word.id !== action.payload : true
        ),
      };

    case ADD_CATEGORY:
      return {
        ...state,
        dictionary: [...state.categories, action.payload],
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter((category) =>
          category.user_id ? category.id !== action.payload : true
        ),
      };
    default:
      return state;
  }
}
