let http = require('http')
// let fs = require('fs')
let unzipper = require('unzipper')

http
  .createServer(function (request, response) {
    // let file = fs.createReadStream('../server/public/tmp.zip')

    // request.pipe(file)
    // request.on('end', () => file.end())

    request.pipe(unzipper.Extract({ path: '../server/public' }))
  })
  .listen(8000)
