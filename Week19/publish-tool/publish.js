let http = require('http')
let fs = require('fs')
let archiver = require('archiver')
let child_process = require('child_process')

child_process.exec(
  `open https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`
)

// fs.stat('./sample.html', (err, stats) => {
let request = http.request(
  {
    hostname: '127.0.0.1',
    port: 8000,
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      // 'Content-Length': stats.size,
    },
  },
  (response) => {
    console.log(response)
  }
)

let file = fs.createReadStream('./sample.html')

const archive = archiver('zip', {
  zlib: { level: 9 },
})

archive.directory('./sample', false)
archive.finalize()

archive.pipe(request)

// file.pipe(request)
// file.on('end', () => request.end())
// })
