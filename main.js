const extract = require("./extract")

extract("https://en.wikipedia.org/wiki/JavaScript")
  .then(text => console.log(text))
  .catch(err => console.error(err))