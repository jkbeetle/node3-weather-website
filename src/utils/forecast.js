const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/21a9531a6a83ab9fbd3e3183da983475/'+lon+', '+lat+'?units=si&lang=de'
    request ({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect...', undefined)
        } else if (body.error) {
            callback('Unable to find location.')
        } else {
            callback(undefined, 
                body.daily.data[0].summary + "Die Temperatur beträgt gerade "+
                body.currently.temperature + "°C und die Regenschwahrscheinlichkeit liegt bei "+
                body.currently.precipProbability+ " . Der Tageshöchstwert beträgt "+
                body.daily.data[0].apparentTemperatureHigh+"°C und der Tiefstwert "+
                body.daily.data[0].apparentTemperatureLow+"°C."
                )
        }
    })
}

module.exports = forecast