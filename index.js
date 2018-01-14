'use strict';

const rp = require('request-promise');
const configClient = require('./lib/cacheClient');
const config = configClient.loadConfigs(['DEMO_KEY', 'DEMO_KEY_ENCRYPTED']);
let params = new Map();

let getParams = co(function* () {
    params = new Map([
        ['DEMO_KEY', yield config.DEMO_KEY],
        ['DEMO_KEY_ENCRYPTED', yield config.DEMO_KEY_ENCRYPTED]
    ]);
    return yield Promise.resolve();
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
    // Astronomy Picture of the Day API (APOD)
    // https://api.nasa.gov/api.html#apod
    getAstronomyPicOfDay: function (callback) {
        getParams.then(() => {
            let options = {
                uri: 'https://api.nasa.gov/planetary/apod',
                qs: {
                    'api_key': params.get('DEMO_KEY_ENCRYPTED')
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
        getParams.then(() => {
            let options = {
                uri: 'https://api.nasa.gov/EPIC/api/natural/images',
                qs: {
                    'api_key': params.get('DEMO_KEY_ENCRYPTED')
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
