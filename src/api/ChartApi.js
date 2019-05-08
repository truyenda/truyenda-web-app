import Caller from "../utils/APICaller.js";

const prefix = "stories/";

export default {

   listDay() {
      return Caller(prefix + "day", "GET");
   },

   listWeek() {
      return Caller(prefix + "week", "GET");
   },

   listMonth() {
      return Caller(prefix + "month", "GET");
   },

   listAll() {
      return Caller(prefix + "all", "GET");
   },

   listRecommended() {
      return Caller(prefix + "recommend", "GET");
   }
};