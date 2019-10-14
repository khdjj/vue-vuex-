/*
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-10-14 10:18:08
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-14 10:37:34
 */
import axios from 'axios';
let baseUrl = "http://localhost:8001";

export const collectPlayList = function(playlistid){
    return new Promise((resolve, reject) => {
        axios.post(baseUrl+'/weapi/playlist/toCollectPlayList', {
            playlistid:playlistid.id
        }).then(function (res) {
            resolve(res);
        }).catch(function (error) {
            reject();
            console.log(error);
        });
    })
}