import Vue from 'vue';
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);
const state = {
    song: {
        album: "未知",
        album_id: "",
        album_img: "http://p2.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg?param=180y180",
        artist_ids: "",
        artist_names: [{artist_name:'未知'}],
        play_volume: "",
        song_id: "",
        song_name: "未知",
        song_url: "",
        song_lyric:""
    },
    playerList: [],
    login: false,
    currTime:0,
    userInfo:{
        nickname:null,
        avatar:'http://p2.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg?param=180y180',
        userId:null,
        email:null
    },
    token:null
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})