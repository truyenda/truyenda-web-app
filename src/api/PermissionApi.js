import Caller from '../utils/APICaller';

const prefix = 'permissions/'

export default {
    list(){
        return Caller(prefix, 'GET');
    }
}