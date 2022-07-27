const http = require('http')
const { convert } = require('../5-buffer/5-convert')

const server = http.createServer((req, res) => {
  //   console.log('%o', Object.keys(req))
  //   console.log(req.method)
  //   console.log(req.httpVersion)
  //   console.log(req.url)
  //   console.log(req.statusCode)
  //   console.log(req.headers)

  //   res.statusCode = 404
  res.setHeader('content-type', 'text/html')

  const base64 = convert('Ali Mousavi', 'utf8', 'base64')
  console.log(base64)

  const buffer = Buffer.from(base64, 'base64')
  console.log(buffer)

  res.write('<h1>')
  res.write(buffer, 'utf8')
  res.write('</h1>')

  res.end()

  //   res.write('ali') // wrong
  console.log('Code work! you can use return before end')
})

server.listen(3000, () => {
  console.clear()
  console.log('Server running on port 3000')
})
