import axios from 'axios';
let baseUrl = "http://localhost:8001";

export default  (url = '', data = {}, type = "GET") => {
    type = type.toUpperCase();
    url = baseUrl + url;
    if (type == 'GET') {
        return new Promise((resolve,reject)=>{
         axios.get(url, {
                params: data
            }).then(function (res) {
                resolve(res);
            }).catch(function (error) {
                reject();
                console.log(error);
            });
        })
    }
    if (type == 'POST') {
        return new Promise((resolve,reject)=>{
            axios.post(url,data).then(function (res) {
                resolve(res);
            }).catch(function (error) {
                reject();
                console.log(error);
            });
        })
    }
}