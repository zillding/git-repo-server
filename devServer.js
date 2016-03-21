const express = require('express')
const webpack = require('webpack')

const config = require('./webpack.config.dev')
const compiler = webpack(config)

const app = require('./lib/apiServer')

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', function(req, res) {
  res.sendFile(`${__dirname}/lib/public/index.html`)
})

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err)
    return
  }

  console.log('Listening at http://localhost:3000')
})
