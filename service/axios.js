import axios from 'axios';
let baseUrl = "http://localhost:8001";
axios.defaults.withCredentials=true
export default (url = '', data = {}, type = "GET",config) => {
    type = type.toUpperCase();
    url = baseUrl + url;
    console.log(type);
    if (type == 'GET') {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: data
            },{
                withCredentials:true
            }).then(function (res) {
                resolve(res);
            }).catch(function (error) {
                reject();
                console.log(error);
            });
        })
    }
    if (type == 'POST') {
        if(config){
            console.log("abc");
            return new Promise((resolve, reject) => {
                axios.post(url, data, {
                    headers:{
                      'Content-Type':'application/x-www-form-urlencoded'
                    }
                  }).then(function (res) {
                    resolve(res);
                }).catch(function (error) {
                    reject();
                    console.log(error);
                });
            })
        }else{
            return new Promise((resolve, reject) => {
                axios.post(url, data).then(function (res) {
                    resolve(res);
                }).catch(function (error) {
                    reject();
                    console.log(error);
                });
            })
        }
    }
}