import axios from 'axios';
import {getStore} from './getStoreData';
let baseUrl = "http://localhost:8001";

axios.defaults.withCredentials=true;

// 请求拦截器

axios.interceptors.request.use(
    config =>{
        let authorization = getStore('Authorization');
        console.log("拦截器的authorization:\t"+authorization);
        if(authorization){
            config.headers.Authorization = authorization;
        }
        return config;
    },
    err =>{
        return Promise.reject(err);
    }
)
export default (url = '', data = {}, type = "GET",token) => {
    type = type.toUpperCase();
    url = baseUrl + url;
    console.log(type);
    if (type == 'GET') {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: data,
                userId:getStore("userId")
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