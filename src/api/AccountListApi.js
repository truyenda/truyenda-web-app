import Caller from '../utils/APICaller';

const prefix = "account/";
export default {
  list(index = 1) {
    return Caller(prefix + "page/" + index, "GET");
  },
  update(profile) {
    var data = { 
      Username: profile.Username, 
      Email: profile.Email,
      IdTrangThai: profile.IdTrangThai,
      IdNhom: profile.IdNhom,
      IdQuyen: profile.IdQuyen
    };
    console.log(data);
    return Caller(prefix + profile.Id, "PUT", data);
  },
  delete(account) {
    return Caller(prefix + account.Id, "DELETE");
  }
};
