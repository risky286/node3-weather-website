const request = require('request')


const fetchData = (latitude, longitude, callback) => {
    const url="http://api.weatherstack.com/current?access_key=0e21603e8c9c29e2f725e4b859137419&query=" +encodeURIComponent(latitude) + "," + encodeURIComponent(longitude)
    request({ url: url, json:true}, (error,response) => {
        if (error) {
            callback("errored", undefined)
        }else {
            callback(undefined, {
                temp:response.body.current.temperature,
                feel:response.body.current.feelslike
            })
        }
    })
}  
module.exports = fetchData