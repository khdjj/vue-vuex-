/*
 * @Descripttion: vuex的数据保存处理
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-06 10:24:45
 * @LastEditors: khdjj
 * @LastEditTime: 2019-07-13 20:24:57
 */

 import {setStore} from "../../service/getStoreData"
export default {
    SAVE_SONG(state, song) {
        state.song = song;
        console.log(state.song);
        setStore('aaaaa',state.song);
    },
    SAVE_SONG_URL(state, url) {
        state.song.song_url = url;
    },
    SAVE_SONG_LYRIC(state, lyric) {
        state.song.song_lyric = lyric;
    },
    SAVE_CURRTIME(state, time) {
        console.log(time);
        state.currTime = time;
    },
    SAVE_PLAYERLIST(state,data) {
        if (data.isArray) {
            state.playerList = data.list;
        } else {
            state.playerList.push(data.list);
        }
        console.log(state.playerList);
        setStore('bbbbb',state.playerList);
    },
    SAVE_USER(state,data){
        console.log(data);
        if(!data.avator){
            data.avator = 'http://p2.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg?param=180y180';
        }else{
            data.avator = "http://localhost:8001/img/"+data.avator;
        }
        state.userInfo = data;
    }
}