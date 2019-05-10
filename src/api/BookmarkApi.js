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
  updateByChapterId(idChuong, idTruyen) {
    var data = {
        IdChuongTheoDoi: idChuong,
        IdTruyen: idTruyen
    };
    return Caller(prefix, "PUT", data);
  },
  delete(idTruyen) {
    return Caller(prefix + "strory/" + idTruyen, "DELETE");
  },
  getByComicId(idTruyen) {
    return Caller(prefix + "strory/" + idTruyen, "GET");
  }

};
