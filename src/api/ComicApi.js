import Caller from "../utils/APICaller";

const prefix = "stories/";

export default {
   get(idComic) {
      return Caller();
   },
   add(story) {
      const data = {
         //
      };
      return Caller(prefix, "POST", data);
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
      return Caller("story/" + "search/" + query + "/page/" + index, "GET");
   }
};
