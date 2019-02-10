# wiki-extractor
Extract raw text from wiki articles

### Dependencies

* cheerio ^1.0.0-rc.2

### Usage

Clone the repo.

Run `$ npm install`.

Create a new file `main.js`:

```javascript
const extract = require("./extract")

extract("https://en.wikipedia.org/wiki/JavaScript")
  .then(text => console.log(text))
  .catch(err => console.error(err))
```

Run `$ node main.js`.