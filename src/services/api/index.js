import RequestService from "../../utils/RequestService";
import { BASE_CONFIG } from "./constants";

import lessons from "./lessons";
import dictionary from "./dictionary";
import auth from "./auth";

export const request = new RequestService(BASE_CONFIG);

export default {
  ...auth,
  ...lessons,
  ...dictionary,
};
