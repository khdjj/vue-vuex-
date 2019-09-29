import { getStore } from "../../service/getStoreData"

export default {
    getSong({commit,state}) {
        let song = getStore('song');
        console.log(song);
        song && commit('SAVE_SONG', song);
    },
    getPlayerList({commit,state}) {
        let playerList = getStore('playerList');
        if (playerList) {
            let data = {
                isArray: true,
                list: playerList
            };
            playerList && commit('SAVE_PLAYERLIST', data);
        }
    },
    getUserInfo({commit,state}){
        let userInfo = getStore('userInfo');
        console.log(userInfo);
        if(userInfo){
            commit('SAVE_USER',userInfo);
        }
    }
}