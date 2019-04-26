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
    return Caller(prefix, "GET");
  },
  get(idTeam) {
    return Caller(prefix + idTeam, "GET");
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
