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
  requestChangePassword(tokenReset, newPassword) {
    var data = { tokenReset: tokenReset, NewPass: newPassword };
    return Caller("forgot", "PUT", data);
  },
  update(name, birthday, gender, cfPassword = "", newPassword = "") {
    var data = {
      Ten: name,
      NgaySinh: birthday,
      GioiTinh: gender,
      Confirm_Password: cfPassword,
      New_Passord: newPassword
    };
    return Caller("accounts/my", "PUT", data);
  }
};
