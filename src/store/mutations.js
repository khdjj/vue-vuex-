/*
 * @Descripttion: vuex的数据保存处理
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-06 10:24:45
 * @LastEditors: khdjj
 * @LastEditTime: 2019-06-21 19:19:01
 */

export default {
    SAVE_SONG(state, song) {
        state.song = song;
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
    }
}