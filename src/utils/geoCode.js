const request = require('request')

const tempData = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoicmlza3kyODUiLCJhIjoiY2wzOGc5ZG53MDBhOTNicDVsbWdlYnJucyJ9.zQsCJt5iVyNlmEfSLDADpQ&limit=1"
    request({ url: url , json: true}, (error, response) => {
        if(error) {
            callback('unable to locate', undefined)
        }else if(response.body.features.length === 0) {
            callback('error while fetch', undefined)
        }else {
            callback(undefined, {
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })
}



module.exports = tempData