
export const setStore = function(name,song){
    if(!name) return;
    window.localStorage.setItem(name,song);
}
export const getStore = function(name){

    if(!name) return;
    return window.localStorage.getItem(name);
}
