import { sessionService } from "redux-react-session";
import * as sessionApi from "../api/SessionApi";
import Toast from "../components/commonUI/Toast";
import Cookies from "universal-cookie";
export const login = (user, history) => {
  return () => {
    return sessionApi
      .login(user)
      .then(response => {
        var res = response.data;
        if (res.Code && res.Code === 200) {
          Toast.success("Đăng nhập thành công", "Thành công", {
            onOpen: ({ cls }) => {
              history.push("/");
            }
          });
          var token = { token: res.Data.Token };
          sessionService.saveSession(token);
          var user = res.Data.Profile;
          sessionService.saveUser(user);
          const cookies = new Cookies();
          var date = new Date();
          let days = 4;
          date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
          cookies.set("token", res.Data.Token, {
            path: "/",
            domain: ".truyenda.tk",
            expires: date
          });
        } else {
          if (res.Code < 300)
            Toast.error("Tài khoản đăng nhập không đúng", "Error " + res.Code);
          else Toast.error(res.MsgEror);
        }
      })
      .catch(err => {
        Toast.error("Có lỗi trong quá trình kết nối");
      });
  };
};

export const logout = history => {
    return () => {
    // return sessionApi
    //   .logout()
    //   .then(() => {
    //     sessionService.deleteSession();
    //     sessionService.deleteUser();
    //     history.push("/");
    //   })
    //   .catch(err => {
    //     throw err;
    //   });
  };
};
