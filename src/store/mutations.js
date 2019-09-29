/*
 * @Descripttion: vuex的数据保存处理
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-06 10:24:45
 * @LastEditors: khdjj
 * @LastEditTime: 2019-07-27 21:58:21
 */

 import {setStore,removeStore} from "../../service/getStoreData"
export default {
    SAVE_SONG(state, song) {
        state.song = song;
        setStore('song',state.song);
    },
    SAVE_SONG_URL(state, url) {
        state.song.song_url = url;
    },
    SAVE_SONG_LYRIC(state, lyric) {
        state.song.song_lyric = lyric;
    },
    SAVE_CURRTIME(state, time) {
        state.currTime = time;
    },
    SAVE_PLAYERLIST(state,data) {
        if (data.isArray) {
            state.playerList = data.list;
        } else {
            state.playerList.push(data.list);
        }
        setStore('playerList',state.playerList);
    },
    SAVE_USER(state,data){
        if(data.avator!=''){
            data.avator = 'http://p2.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg?param=180y180';
        }else{
            data.avator = "http://localhost:8001/img/"+data.avator;
        }
        state.userInfo = data;
        console.log("userId:\t"+data.userId);
        //单独存储userId是方便获取后台数据
        setStore('userId',data.userId);
        //存储用户数据信息
        setStore('userInfo',data);
    },
    SAVE_TOKEN(state,token){
        state.token = token;
        setStore("Authorization",token);
    },
    LOGOUT(state){
        state.userInfo = null;
        state.userId = null;
        removeStore('userInfo');
        removeStore('userId');
        removeStore('Authorization');
    }
}