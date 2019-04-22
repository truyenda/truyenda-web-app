import Caller from '../utils/APICaller';

export const getMyBookmark = () => {
    var uri = 'bookmarks/my';
    return Caller(uri, "GET");
}

export const createBookmark = (idTruyen) => {
    var data = {Id_Truyen: idTruyen};
    var uri = 'bookmarks';
    return Caller(uri, 'POST', data);
}

export const updateBookmark = (idBookmark, idChuong) => {
    var data = {IdChuongTheoDoi: idChuong};
    var uri = 'bookmarks/'+idBookmark;
    return Caller(uri, 'PUT', data);
}

export const deleteBookmark = (idBookmark) => {
    var uri = 'bookmarks/'+idBookmark;
    return Caller(uri, 'DELETE');
}