import Caller from '../utils/APICaller';

const prefix = 'role/';

export default {
    create(role){

    },
    list(){
        return Caller(prefix, 'GET');
    },
    get(IdRole){

    },
    update(role){

    },
    delete(role){

    }
}