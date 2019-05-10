import Caller from "../utils/APICaller";
const prefix = "teams/";
const posfix = "/members/";
export default {
  list(IdTeam) {
    return Caller(prefix + IdTeam + "/members", "GET");
  },
  update(IdTeam, IdUser, IdRole) {
    var data = { Id_Role: IdRole };
    return Caller(
      prefix + IdTeam + posfix + IdUser + "/permissions",
      "PUT",
      data
    );
  },
  delete(IdTeam, IdUser) {
    return Caller(prefix + IdTeam + posfix + IdUser, "DELETE");
  },
  add(IdTeam, Username) {
    var data = { Username: Username };
    return Caller(prefix + IdTeam + posfix, "POST", data);
  }
};
