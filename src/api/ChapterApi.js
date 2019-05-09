import Caller from "../utils/APICaller.js";

const prefix = "chapters/";

export default {
  create(chapter) {
    var data = {
      IdTruyen: chapter.IdStory,
      TenChuong: chapter.title,
      SoThuTu: chapter.priority,
      LinkAnh: chapter.links
    };
    return Caller(prefix, "POST", data);
  },
  list(IdStory) {
    return Caller("stories/" + IdStory + "/chapters", "GET");
  },
  list_latest(index=1) {
    return Caller(prefix + "latest-update/" + index);
  },
  get(IdChapter) {
    return Caller(prefix + IdChapter, "GET");
  },
  update(chapter) {
    var data = {
      IdTruyen: chapter.IdStory,
      TenChuong: chapter.title,
      SoThuTu: chapter.priority,
      LinkAnh: chapter.links
    };
    return Caller(prefix + chapter.Id, "PUT", data);
  },
  delete(chapter) {
    return Caller(prefix + chapter.Id, "DELETE");
  }
};
