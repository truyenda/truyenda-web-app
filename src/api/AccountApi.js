import Caller from "../utils/APICaller";

export default {
  create(username, name, gender, birthday, email, password, cfPassword) {
    var data = {
      Username: username,
      Ten: name,
      GioiTinh: gender,
      NgaySinh: birthday,
      Email: email,
      Password: password,
      ConfirmPassword: cfPassword
    };
    return Caller("accounts", "POST", data);
  },
  requestForgot(email) {
    var data = { email: email };
    return Caller("forgot", "POST", data);
  },
  updateNewPassword(tokenReset, newPassword) {
    var data = { tokenReset, newPassword };
    return Caller("forgot", "PUT", data);
  }
};
