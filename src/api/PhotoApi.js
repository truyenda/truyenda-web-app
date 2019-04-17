import axios from 'axios';

export default function uploadPhoto(file){
    var formData = new FormData();
    formData.set('image', file);
    return new Promise( (res, rej) => {
        const rs = new XMLHttpRequest()
        rs.open('POST', 'https://api.imgur.com/3/image/')
        rs.setRequestHeader('Authorization', 'Client-ID 1794fe720939b96')
        rs.onreadystatechange = () => {
            if(rs.status === 200 && rs.readyState===4){
                console.log(rs.response)
                return res(JSON.parse(rs.responseText));
            }
        }
        rs.send(formData);

    })
    // return axios(
    //     'https://shieldmanga.icu',
    //     {
    //         method: 'POST',
    //         headers:{
    //             'Authorization': 'Client-ID 1794fe720939b96'
    //         },
    //         data: formData,
    //     }
    // );
}