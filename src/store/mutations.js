/*
 * @Descripttion: vuex的数据保存处理
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-06 10:24:45
 * @LastEditors: khdjj
 * @LastEditTime: 2019-06-09 14:38:17
 */

export default{
    SAVE_SONG(state,song){
        state.song = song;
    },
    SAVE_SONG_URL(state,url){
        state.song.song_url = url;
    },
    SAVE_SONG_LYRIC(state,lyric){
        state.song.song_lyric = lyric;
    },
    SAVE_CURRTIME(state,time){
        console.log(time);
        state.currTime = time;
    }
}