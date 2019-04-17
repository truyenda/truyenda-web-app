import { sessionService } from "redux-react-session";
import * as sessionApi from "../api/SessionApi";
import Toast from "../components/commonUI/Toast";
import Cookies from "universal-cookie";

export const login = (user, history, callback) => {
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
        } else {
          if (res.Code < 300)
            Toast.error("Tài khoản đăng nhập không đúng", "Error " + res.Code);
          else Toast.error(res.MsgEror);
          callback();
        }
      })
      .catch(err => {
        Toast.error("Có lỗi trong quá trình kết nối");
        callback();
      });
  };
};

export const logout = history => {
  return () => {
    return sessionApi
      .logout()
      .then(res => {
        if(res.data.Code && res.data.Code === 200 && res.data.IsSuccess && res.data.IsValid){
          console.log("logout");
          sessionService.deleteSession();
          sessionService.deleteUser();
          var cookie = new Cookies();
          cookie.remove("ToKen", {
            path: "/",
            domain: ".truyenda.tk"
          });
          Toast.success("Bạn đã đăng xuất");
          history.push("/");
        }else{
          Toast.notify("Phiên đăng xuất thất bại");
        }
      })
      .catch(err => {Toast.error('Có lỗi trong quá trình kết nối')});
  };
};

export const validateSession = session => {
  var cookie = new Cookies();
  var token = cookie.get("ToKen");
  if (token) {
    return sessionApi
      .valid()
      .then(res => {
        if (res.data.Code === 200) {
          sessionService.saveSession({ token: token });
          sessionService.saveUser(res.data.Data);
          console.log("Loaded session");
          return true;
        } else {
          console.log("Fail session");
          cookie.remove("ToKen", {
            path: "/",
            domain: ".truyenda.tk"
          });
          return false;
        }
      })
      .catch(err => {
        console.log("Error valid");
        cookie.remove("ToKen", {
          path: "/",
          domain: ".truyenda.tk"
        });
        return false;
      });
  } else {
    console.log("Not contain token");
    return false;
  }
};
