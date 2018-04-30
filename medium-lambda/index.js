const request = require('request')

const mediumUsername = 'stijn.koopal'

const handler = (event, context, callback) => {
  const url = `https://medium.com/@${mediumUsername}/latest?format=json`

  const respond = (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const jsonBody = JSON.parse(body.replace('])}while(1);</x>', ''))
      callback(null, jsonBody)
    } else {
      callback(error)
    }
  }

  request({url, json: true}, respond)
}

exports.handler = handler
