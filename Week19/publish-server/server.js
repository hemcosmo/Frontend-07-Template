let http = require('http')
let https = require('https')
// let fs = require('fs')
let unzipper = require('unzipper')
let querystring = require('querystring')

function auth(request, response) {
  let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1])

  getToken(query.code, (info) => {
    // response.write(JSON.stringify(info))
    response.write(
      `<a href="http://localhost:8001/?token=${info.access_token}">pub</a>`
    )

    response.end()
  })
}

function getToken(code, cb) {
  let request = https.request(
    {
      hostname: 'github.com',
      path: `login/oauth/access_token?code=${code}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,
      port: 443,
      method: 'POST',
    },
    (response) => {
      let body = ''

      response.on('data', (chunk) => {
        body += chunk.toString()
      })

      response.on('end', () => {
        cb(querystring.parse(body))
      })
    }
  )

  request.end()
}

function getUser(token, cb) {
  let request = https.request(
    {
      hostname: 'api.github.com',
      path: '/user',
      port: 443,
      headers: {
        Authorization: `token ${token}`,
        'User-Agent': 'publisher',
      },
    },
    (response) => {
      let body = ''

      response.on('data', (chunk) => {
        body += chunk.toString()
      })

      response.on('end', () => {
        cb(JSON.parse(body))
      })
    }
  )

  request.end()
}

function publish(request, response) {
  let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1])

  getUser(query.token, (info) => {
    if (info.name === 'system') {
      request.pipe(unzipper.Extract({ path: '../server/public' }))

      request.on('end', () => {
        response.end('success')
      })
    }
  })
}

http
  .createServer(function (request, response) {
    if (request.url.match(/^\/auth\?/)) return auth(request, response)

    if (request.url.match(/^\/publish\?/)) return publish(request, response)

    // let file = fs.createReadStream('../server/public/tmp.zip')

    // request.pipe(file)
    // request.on('end', () => file.end())
  })
  .listen(8000)
