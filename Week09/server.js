const http = require('http')

http
  .createServer((request, response) => {
    let body = []

    request
      .on('error', (err) => console.log(err))
      .on('data', (chunk) => body.push(chunk))
      .on('end', () => {
        body = Buffer.concat(body).toString()
        console.log('body: ', body)

        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end(`
          <html>
            <body>
              <a href="#">test</a>
            </body>
          </html>
        `)
      })
  })
  .listen(2021)

console.log('2021 is coming ...')
