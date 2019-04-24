import Caller from "../utils/APICaller";

const prefix = "authors/";

export default {
  add(author) {
    var data = { TenTacGia: author.name };
    return Caller(prefix, "POST", data);
  },
  list(index) {
    //TODO: fix page parameter
    return Caller(prefix + index, "GET");
  },
  search(query, index) {
    return Caller(prefix + "search/" + query + "/page/" + index, "GET");
  },
  get(idAuthor) {
    return Caller();
  },
  update(author) {
    var data = { TenTacGia: author.name };
    return Caller(prefix + author.Id, "PUT", data);
  },
  delete(author) {
    return Caller(prefix + author.Id, "DELETE");
  }
};
