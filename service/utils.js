/*
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-03 21:11:52
 * @LastEditors: khdjj
 * @LastEditTime: 2019-06-03 21:11:52
 */

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

export const formatImage = function(value){
    const imgBaseUrl = 'http://localhost:8001/img/';
    if(!/^http|https/.test(value)){
        value = imgBaseUrl + value ;
      }
      return value;
}