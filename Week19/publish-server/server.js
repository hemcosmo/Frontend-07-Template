let http = require('http')
let https = require('https')
// let fs = require('fs')
let unzipper = require('unzipper')
let querystring = require('querystring')

function auth(request, response) {
  let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1])

  getToken(query.code)
}

function getToken(code) {
  let request = https.request(
    {
      hostname: 'github.com',
      path: `login/oauth/access_token?code=${code}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,
      port: 443,
      method: 'POST',
    },
    (response) => {
      console.log(response)
    }
  )

  request.end()
}

function publish(request, response) {}

http
  .createServer(function (request, response) {
    if (request.url.match(/^\/auth\?/)) return auth(request, response)

    if (request.url.match(/^\/publish\?/)) return publish(request, response)

    // let file = fs.createReadStream('../server/public/tmp.zip')

    // request.pipe(file)
    // request.on('end', () => file.end())

    request.pipe(unzipper.Extract({ path: '../server/public' }))
  })
  .listen(8000)
