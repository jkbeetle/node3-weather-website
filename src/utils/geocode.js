const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYmVldGxlYnVtIiwiYSI6ImNrNDV5b2RyajBkZzYzb215Z2hidHY1Ym8ifQ.HtciGKLpFVZcOlc5Z8xeXA&limit=1'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect...', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined,{
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                places: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode