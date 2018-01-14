# NASA API Request Module

## Usage

Add to `package.json`

To install module from your private npm repository

```bash
npm install nasa-api-module
```

```text
{
  "dependencies": {
    "nasa-api-module": "^1.0.19"
  }
}
```

To install module from GitHub

```text
{
  "dependencies": {
         "nasa-api-module": "github:garystafford/nasa-api-module#semver:1.0.19"
  }
}
```

Add to JavaScript file

```javascript
const nasa = require('nasa-api-module');

return new Promise((resolve, reject) => {
    nasa.getAstronomyPicOfDay((err, body) => {
        if (err) {
            return reject(err)
        }

        return resolve(body)
    })
})
```

## Publish Module to Nexus

Update `package.json`

```json
{
  "version": "1.0.19"
}
```

```bash
# commit changes
git add -A && git commit -m "Updating release version" && git push

# tag
git tag -a 1.0.19 -m "1.0.19"
git push --tags

# publish
npm login --registry=http://localhost:8081/repository/npm-group
npm publish # my registry is hard-coded in package.json
```

## AWS Parameter Store

Modules uses `cacheClient.js` from [theburningmonk/lambda-config-demo](https://github.com/theburningmonk/lambda-config-demo) GitHub repo, to access my personal NASA API Key from my AWS [Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-paramstore.html). My AWS Region is currently hard-coded in `cacheClient.js`, to hack around the following error: `ConfigError: Missing region in config AWS`.
