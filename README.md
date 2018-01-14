Publishing steps
```bash
git add -A && git commit -m "Updating release version" && git push
git tag -a 1.0.3 -m "1.0.3"
git push --tags
npm publish --tag 1.0.1
```