import RequestService from "../../utils/RequestService";
import { BACK_URL } from "./constants";

export default [
  { name: "auth", url: "auth" },
  { name: "user", url: "user" },
  { name: "lessons", url: "lessons" },
  { name: "dictionary", url: "dictionary" },
  { name: "stats", url: "stats" },
  { name: "settings", url: "settings" },
].reduce((total, item) => {
  total[item.name] = new RequestService({
    baseURL: BACK_URL + item.url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return total;
}, {});
