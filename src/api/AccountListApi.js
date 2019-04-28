import Caller from '../utils/APICaller';

const prefix = "account";
export default {
  list() {
    return Caller(prefix + "/page/1", "GET");
  },
  update(profile) {
    var data = { Username: profile.Username, Email: profile.Email };
    return Caller(prefix + "/" + profile.Id, "PUT", data);
  }
};
