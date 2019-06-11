//艺术家信息进行处理
exports.formatArtist = function(artists){
    let art = "";
    for (let i = 0; i < artists.length; i++) {
      art += artists[i].artist_name + " / ";
    }
    art = art.substring(0, art.lastIndexOf("/"));
    return art;
}

