import Caller from "../utils/APICaller";

const prefix = "teams/";

export default {
  create(team) {
    var data = {
      TenNhomDich: team.name,
      MoTa: team.description,
      Logo: team.Logo
    };
    return Caller(prefix, "POST", data);
  },
  list(index = 1) {
    return Caller(prefix + "page/" + index, "GET");
  },
  get(idTeam) {
    return Caller(prefix + idTeam, "GET");
  },
  search(query, index = 1) {
    return Caller(prefix + "search/" + query + "/page/" + index);
  },
  update(team) {
    var data = {
      TenNhomDich: team.name,
      MoTa: team.description,
      Logo: team.Logo
    };
    return Caller(prefix + team.Id, "PUT", data);
  },
  delete(team) {
    return Caller(prefix + team.Id, "DELETE");
  }
};
