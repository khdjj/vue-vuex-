import { getStore } from "../../service/getStoreData"

export default {
    getSong({commit,state}) {
        let song = getStore('aaaaa');
        console.log(song);
        song && commit('SAVE_SONG', song);
    },
    getPlayerList({commit,state}) {
        let playerList = getStore('bbbbb');
        if (playerList) {
            let data = {
                isArray: true,
                list: playerList
            };
            playerList && commit('SAVE_PLAYERLIST', data);
        }
    }
}