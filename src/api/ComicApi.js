import Caller from "../utils/APICaller";

const prefix = "stories/";

export default {
  //CREATE
  add(comic) {
    const data = {
      TenTruyen: comic.name,
      TenKhac: comic.anotherName,
      TheLoai: comic.categories.map(c => c.value),
      TacGia: comic.authorsName,
      Id_TrangThai: comic.status,
      NamPhatHanh: comic.releasedDate,
      Id_ChuKy: comic.frequency,
      AnhBia: comic.coverPicture,
      AnhDaiDien: comic.avatarPicture,
      MoTa: comic.description,
      Id_NhomDich: comic.team.value
    };
    return Caller(prefix, "POST", data);
  },
  //READ
  list(index = 1) {
    return Caller(prefix + "page/" + index, "GET");
  },
  search(query, index) {
    return Caller(prefix + "search/" + query + "/page/" + index, "GET");
  },
  searchMy(query, index) {
    return Caller(prefix + "my/search/" + query + "/page/" + index, "GET");
  },
  getByCategory(idCategory) {
    return Caller(prefix + "categorys/" + idCategory, "GET");
  },
  listTrending() {
    return Caller(prefix + "trending", "GET");
  },
  get(idComic) {
    return Caller(prefix + idComic, "GET");
  },
  getChapters(idComic) {
    return Caller(prefix + idComic + "/chapters", "GET");
  },
  filter(term, index = 1) {
    const data = {
      Status: term.rdoStatus,
      Sort: term.sortBy,
      Rank: term.rdoRank,
      Category: term.selectedGenresIds
    };
    console.log(data);
    return Caller(prefix + "filter/page/" + index, "POST", data);
  },
  getMyComic(index = 1) {
    return Caller(prefix + "my/page/" + index, "GET");
  },
  //UPDATE
  update(comic) {
    const data = {
      TenTruyen: comic.name,
      TenKhac: comic.anotherName,
      TheLoai: comic.categories.map(c => c.value),
      TacGia: comic.authorsName,
      Id_TrangThai: comic.status,
      NamPhatHanh: comic.releasedDate,
      Id_ChuKy: comic.frequency,
      AnhBia: comic.coverPicture,
      AnhDaiDien: comic.avatarPicture,
      MoTa: comic.description,
      Id_NhomDich: comic.team.value
    };
    return Caller(prefix + comic.Id, "PUT", data);
  },
  //DELETE
  delete(comic) {
    return Caller(prefix + comic.Id, "DELETE");
  }
};
