import Caller from "../utils/APICaller.js";

const prefix = "sstatus/";

export default {
  add(name) {
    var data = { TentrangThai: name };
    return Caller(prefix, "POST", data);
  },
  list() {
    return Caller(prefix, "GET");
  },
  update(status) {
    var data = { TentrangThai: status.name };
    return Caller(prefix + status.Id, "PUT", data);
  },
  delete(status) {
    return Caller(prefix + status.Id, "DELETE");
  }
};
