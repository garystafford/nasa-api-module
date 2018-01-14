'use strict';

const rp = require('request-promise');
const configClient = require('./lib/cacheClient');
const config = configClient.loadConfigs(['DEMO_KEY', 'DEMO_KEY_ENCRYPTED']);

let p = new Promise((resolve) => {
    resolve(config.DEMO_KEY_ENCRYPTED)
});

function makeRequest(options, callback) {
    rp(options)
        .then(function (body) {
            console.log(body);
            callback(null, body)
        })
        .catch(function (err) {
            console.log('err: ' + err);
            callback(err)
        })
}

module.exports = {
    // Common method to make requests

    // Astronomy Picture of the Day API (APOD)
    // https://api.nasa.gov/api.html#apod
    getAstronomyPicOfDay: function (callback) {
        new Promise((resolve) => {
            resolve(config.DEMO_KEY_ENCRYPTED)
        }).then((value) => {
            let options = {
                uri: 'https://api.nasa.gov/planetary/apod',
                qs: {
                    'api_key': value
                },
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            };
            makeRequest(options, callback)
        })
    },

    // DSCOVR's Earth Polychromatic Imaging Camera (EPIC)
    // https://api.nasa.gov/api.html#neows-swagger
    getEpic: function (callback) {
        new Promise((resolve) => {
            resolve(config.DEMO_KEY_ENCRYPTED)
        }).then((value) => {
            let options = {
                uri: 'https://api.nasa.gov/EPIC/api/natural/images',
                qs: {
                    'api_key': value
                },
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            };
            makeRequest(options, callback)
        })
    }
};
