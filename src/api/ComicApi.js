import Caller from "../utils/APICaller";

const prefix = "stories/";

export default {
   get(idComic) {
      return Caller();
   },
   add(story) {
      const data = {
         //TODO: Wait for API stories/add
         //TODO: Change story.attribute
         Id_Nhom: 2,
         Id_TrangThai: 7,
         Id_ChuKy: 9,
         TenTruyen: "Testing",
         TenKhac: "Nope",
         NamPhatHanh: 2017,
         AnhBia:
            "https://juiceboxinteractive.com/app/uploads/2018/05/Color-Cover-960x547.png",
         AnhDaiDien:
            "https://juiceboxinteractive.com/app/uploads/2018/05/Color-Cover-960x547.png",
         MoTa: "Nothing"
      };
      return Caller(prefix + "add", "POST", data);
   },
   update(story) {
      const data = {
         //
      };
      return Caller(prefix + story.Id, "PUT", data);
   },
   delete(story) {
      return Caller(prefix + story.Id, "DELETE");
   },
   list(index) {
      return Caller(prefix + "page/" + index, "GET");
   },
   search(query, index) {
      return Caller(prefix + "search/" + query + "/page/" + index, "GET");
   }
};
