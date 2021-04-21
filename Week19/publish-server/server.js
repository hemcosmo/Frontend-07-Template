let http = require('http')
let fs = require('fs')

http
  .createServer(function (request, response) {
    console.log(request.headers)

    let file = fs.createReadStream('../server/public/index.html')

    request.on('data', (chunk) => {
      file.write(chunk)
    })

    request.on('end', () => {
      file.end()
      response.end('success')
    })
  })
  .listen(8000)
