import axios from 'axios';

const baseUrl = 'https://api.truyenda.tk';

export default function Caller(endpoint, method = 'GET', body = {}) {
    return axios({
      method: method,
      url: `${baseUrl}/${endpoint}`,
      data: body
    });
};