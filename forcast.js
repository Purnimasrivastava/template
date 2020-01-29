const request  = require('request');

const forcast = (lat,lng,callback)=>{
    const url = 'https://api.darksky.net/forecast/fb62f863ef4624321f218aad3edd3639/'+lat+','+lng;
    request({url,json:true},(err,{body})=>{
        if(err){
            callback('local err',undefined);
        }else if(body.error){
            callback(body.error,undefined)
        }else{
            callback(undefined,body.currently.temperature);
        }
    });
}

module.exports = forcast;