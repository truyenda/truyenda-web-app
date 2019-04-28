import Caller from "../utils/APICaller.js";

const prefix = "role/";

export default {
  list() {
    return Caller(prefix, "GET");
  },
  get(id) {
    return Caller(prefix + id, "GET");
  }
};
