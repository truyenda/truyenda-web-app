import Caller from '../utils/APICaller';

export const login = (user) => {
    const uri = 'login';
    var data = {username: user.username, password: user.password, remember: user.isKeepSession}
    return Caller(uri, 'POST', data);
};

export const logout = () => {
    const uri = 'logout';
    return Caller(uri,'POST');
}

export const valid = () => {
    const uri = 'accounts/my';
    return Caller(uri, "GET");
}