const extract = require("./extract")

extract("https://en.wikipedia.org/wiki/Udea_asychanalis")
  .then(text => console.log(text))
  .catch(err => console.error(err))