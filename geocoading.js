const request = require('request');



const geocoding = (address,callback)=>{
    const url  = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicGcybGV0IiwiYSI6ImNqdDZzMHk5bjBhazE0NGxocnl2ZWNmNmEifQ.kKR5mWUxWKFoIri1r09yTA';
    request({url,json:true},(err,{body})=>{
        if(err){
            callback('have some local error',undefined);
        }else if(body.features.length == 0){
            callback('data not found',undefined);
        }else{
            callback(undefined,{
                lat: body.features[0].center[0],
                lng: body.features[0].center[1],
                place: body.features[0].place_name
            });
        }
    });
}

module.exports = geocoding;