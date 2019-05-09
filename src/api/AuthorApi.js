import Caller from "../utils/APICaller";

const prefix = "authors/";

export default {
  add(author) {
    var data = { TenTacGia: author.name };
    return Caller(prefix, "POST", data);
  },
  list(index) {
    return Caller(prefix + "page/" + index, "GET");
  },
  search(query, index) {
    return Caller(prefix + "search/" + query + "/page/" + index, "GET");
  },
  get(idAuthor) {
    return Caller(prefix + idAuthor, "GET");
  },
  update(author) {
    var data = { TenTacGia: author.name };
    return Caller(prefix + author.Id, "PUT", data);
  },
  delete(author) {
    return Caller(prefix + author.Id, "DELETE");
  }
};
