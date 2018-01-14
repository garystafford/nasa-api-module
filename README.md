# NASA API Request Module

## Usage
Add to `package.json`

```text
{
  "dependencies": {
    "nasa-api-module": "^1.0.3"
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
  "version": "1.0.3"
}
```

```bash
# commit changes
git add -A && git commit -m "Updating release version" && git push

# tag
git tag -a 1.0.3 -m "1.0.3"
git push --tags

# publish
npm login --registry=http://localhost:8081/repository/npm-group
npm publish --registry http://localhost:8081/repository/npm-hosted
```