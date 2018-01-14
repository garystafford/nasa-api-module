'use strict';

const rp = require('request-promise');
const configClient = require('./lib/cacheClient');
const config = configClient.loadConfigs(['DEMO_KEY', 'DEMO_KEY_ENCRYPTED']);

let p = new Promise((resolve, reject) => {
    return resolve(config.DEMO_KEY_ENCRYPTED)
});

module.exports = {
    // Common method to make requests
    makeRequest: function (options, callback) {
        rp(options)
            .then(function (body) {
                console.log(body);
                callback(null, body)
            })
            .catch(function (err) {
                console.log('err: ' + err);
                callback(err)
            })
    },

    // Astronomy Picture of the Day API (APOD)
    // https://api.nasa.gov/api.html#apod
    getAstronomyPicOfDay: function (callback) {
        p.then(function (data) {
            let options = {
                uri: 'https://api.nasa.gov/planetary/apod',
                qs: {
                    'api_key': data
                },
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            };
            this.makeRequest(options, callback)
        })
    },

    // DSCOVR's Earth Polychromatic Imaging Camera (EPIC)
    // https://api.nasa.gov/api.html#neows-swagger
    getEpic: function (callback) {
        p.then(function (data) {
            let options = {
                uri: 'https://api.nasa.gov/EPIC/api/natural/images',
                qs: {
                    'api_key': data
                },
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            };
            this.makeRequest(options, callback)
        })

    }
};
