
export const numFormat = function(num){
    let b,len = num.length;


    if(typeof num != "string" || len < 5 || isNaN(num)){
        return num;
    }
    if(len>=5&&len<=8){
        b = len - 5 + 1;
        return num.substring(0,b)+'万';
    }

    if(len>8){
        b = len - 8 +1;
        return num.substring(0,b)+'亿';
    }
}