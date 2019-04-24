import Caller from "../utils/APICaller";

const prefix = "categories";
export default {
  list() {
    return Caller(prefix, "GET");
  },
  add(category) {
    var data = { TenLoaiTruyen: category.name, MoTa: category.description };
    return Caller(prefix, "POST", data);
  },
  update(category) {
    var data = { TenLoaiTruyen: category.name, MoTa: category.description };
    return Caller(prefix + "/" + category.Id, "PUT", data);
  },
  delete(category) {
    return Caller(prefix + "/" + category.Id, "DELETE");
  }
};