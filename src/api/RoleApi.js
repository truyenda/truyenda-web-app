import Caller from "../utils/APICaller";

const prefix = "role/";

export default {
  create(role) {
    var data = {
      TenVaiTro: role.name,
      Id_QuyenList: role.permissions?role.permissions.map(p => p.value):[]
    };
    return Caller(prefix, "POST", data);
  },
  list() {
    return Caller(prefix, "GET");
  },
  get(IdRole) {
    return Caller(prefix + IdRole, "GET");
  },
  getTeamRole() {
    return Caller(prefix + "team", "GET");
  },
  update(role) {
    var data = {
      TenVaiTro: role.name,
      Id_QuyenList: role.permissions?role.permissions.map(p => p.value):[]
    };
    return Caller(prefix + role.Id, "PUT", data);
  },
  delete(role) {
    return Caller(prefix + role.Id, "DELETE");
  }
};
