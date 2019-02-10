const https = require("https")
const cheerio = require("cheerio")

module.exports = extract

function extract(url) {
  return getURL(url).then(rawHTML => extractText(rawHTML))
}

function getURL(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const { statusCode } = res

      if (statusCode !== 200) {
        res.resume()
        return reject(new Error(`Request Failed; Status Code: ${statusCode}`))
      }

      res.setEncoding("utf8")
      let rawData = ""

      res.on("data", chunk => { rawData += chunk })

      res.on("end", () => {
        resolve(rawData)
      })
    }).on("error", e => {
      reject(e)
    })
  })
}

function extractText(rawHTML) {
  const $ = cheerio.load(rawHTML)
  let text = ""

  text += $("#firstHeading").text().trim() + "\n" // include the title

  const body = $("#mw-content-text .mw-parser-output")
  $(body).find("sup").remove() // remove superscripts

  $(body).children()
    .filter((_, node) => ["p", "h2"].includes(node.tagName)) // include subheadings and text
    .filter((_, node) => $(node).find("#References").length === 0) // remove references
    .filter((_, node) => $(node).find("#External_Links").length === 0) // remove eternal links
    .each((_, node) => {
      if (node.tagName === "p") {
        text += $(node).text().trim()
      } else {
        text += $(node).find(".mw-headline").text().trim() // only read the actual text, not [edit]
      }

      text += "\n"
    })

  return text
}