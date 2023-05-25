import axios from "axios";

const apiUrl = 'http://localhost:5170';

export default function CallApi(endpoint,method = 'GET',body){
    return axios({
        method,
        url:`${apiUrl}/${endpoint}`,
        data:body
    }).catch(err => {
        console.log(err);
    })
}


