import Caller from "../utils/APICaller";

const prefix = "bookmarks/";

export default {
  list() {
    return Caller(prefix + "my", "GET");
  },
  create(idTruyen) {
    var data = { Id_Truyen: idTruyen };
    return Caller(prefix, "POST", data);
  },
  update(idBookmark, idChuong) {
    var data = { IdChuongTheoDoi: idChuong };
    return Caller(prefix + idBookmark, "PUT", data);
  },
  delete(idBookmark) {
    return Caller(prefix + "strory/" + idBookmark, "DELETE");
  },
  getByComicId(idTruyen) {
    return Caller(prefix + "strory/" + idTruyen, "GET");
  }

};
