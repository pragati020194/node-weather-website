const request = require('request')

const forecast = (longitude, latitude , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=eaba3467992718b333a3e011713ca993&query=' + latitude + ',' + longitude + '&units=m'

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error){
            callback('Unable to find location. Try another search', undefined)
        } else {
            console.log(body.daily.data[0])
            callback(undefined, body.current.weather_descriptions[0] + 
            '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike 
            + ' degrees out. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast 