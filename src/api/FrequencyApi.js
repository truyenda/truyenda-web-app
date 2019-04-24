import Caller from "../utils/APICaller.js";

const prefix = "frequencies/";

export default {
  add(name) {
    var data = { TenChuKy: name };
    return Caller(prefix, "POST", data);
  },
  list() {
    return Caller(prefix, "GET");
  },
  get(id) {
    return Caller(prefix + id, "GET");
  },
  update(frequency) {
    var data = { TenChuKy: frequency.name };
    return Caller(prefix + frequency.Id, "PUT", data);
  },
  delete(frequency) {
    return Caller(prefix + frequency.Id, "DELETE");
  }
};
