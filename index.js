'use strict';

const co = require('co');
const rp = require('request-promise');
const configClient = require('./lib/cacheClient');
const config = configClient.loadConfigs(['DEMO_KEY', 'DEMO_KEY_ENCRYPTED']);

let DEMO_KEY_ENCRYPTED = '';

co(function *(){
    DEMO_KEY_ENCRYPTED = yield Promise.resolve(config.DEMO_KEY_ENCRYPTED);
}).catch(onerror);

function onerror(err) {
    console.error(err.stack);
}

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
        let options = {
            uri: 'https://api.nasa.gov/planetary/apod',
            qs: {
                'api_key': DEMO_KEY_ENCRYPTED
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        };
        console.log(`config.DEMO_KEY: ${config.DEMO_KEY}`);
        this.makeRequest(options, callback)
    },

    // DSCOVR's Earth Polychromatic Imaging Camera (EPIC)
    // https://api.nasa.gov/api.html#neows-swagger
    getEpic: function (callback) {
        let options = {
            uri: 'https://api.nasa.gov/EPIC/api/natural/images',
            qs: {
                'api_key': DEMO_KEY_ENCRYPTED
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        };
        console.log(`config.DEMO_KEY: ${config.DEMO_KEY}`);
        this.makeRequest(options, callback)
    }
};
