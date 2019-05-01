import Caller from "../utils/APICaller";

const prefix = "stories/";

export default {
   get(idComic) {
      return Caller("commics/" + idComic, "GET");
   },
   add(comic) {
      const data = {
         TenTruyen: comic.name,
         TenKhac: comic.anotherName,
         TheLoai: [2, 9, 14, 19, 7],
         TacGia: comic.authorsName,
         Id_TrangThai: comic.statusId,
         NamPhatHanh: comic.releasedDate,
         Id_ChuKy: comic.frequencyId,
         AnhBia: comic.coverPicture,
         AnhDaiDien: comic.avatarPicture,
         MoTa: comic.description
      };
      return Caller(prefix, "POST", data);
   },
   update(comic) {
      const data = {
         //
      };
      return Caller(prefix + comic.Id, "PUT", data);
   },
   delete(comic) {
      return Caller(prefix + comic.Id, "DELETE");
   },
   list(index) {
      return Caller(prefix + "page/" + index, "GET");
   },
   search(query, index) {
      return Caller(prefix + "search/" + query + "/page/" + index, "GET");
   }
};
