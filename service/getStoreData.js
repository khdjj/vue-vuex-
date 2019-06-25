
export const setStore = function(name,song){
    if(!name) return;
    let data  = JSON.stringify(song);
    window.localStorage.setItem(name,data);
}
export const getStore = function(name){
    if(!name) return;
    let data =  window.localStorage.getItem(name);
    if(data){
        return  JSON.parse(data);
    }
    return null;
}

export const removeStore = function(name){
    if(!name) return;
    window.localStorage.removeItem(name);
}
