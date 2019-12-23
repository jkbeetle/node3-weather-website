const request = require('request')

const forecast = (lon, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/21a9531a6a83ab9fbd3e3183da983475/'+lon+', '+lat+'?units=si&lang=de'
    request ({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect...', undefined)
        } else if (body.error) {
            callback('Unable to find location.')
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                rainprobability: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast