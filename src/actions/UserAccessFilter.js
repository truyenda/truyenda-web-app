export default function UserAccessFilter(permission) {
  try {
    let localUser = localStorage.getItem("redux-react-session/USER_DATA");
    if (localUser) {
      let user = JSON.parse(localUser);
      if (user.Permissions) {
        for (let i = 0; i < user.Permissions.length; i++) {
          if (user.Permissions[i].TenQuyen === permission) {
            return true;
          }
        }
        return false;
      } else {
        return false;
      }
    }
  } catch (err) {
    return false;
  }
}
