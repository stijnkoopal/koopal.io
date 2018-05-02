const request = require('request')
//
const mediumUsername = 'stijn.koopal'
//
// const handler = (event, context, callback) => {
//   const url = `https://medium.com/@${mediumUsername}/latest?format=json`
//
//   const respond = (mediumError, mediumResponse, mediumBody) => {
//     if (!mediumError && mediumResponse.statusCode === 200) {
//       const jsonBody = JSON.parse(mediumBody.replace('])}while(1);</x>', ''))
//       const posts = Object.values(jsonBody.payload.references.Post)
//
//       const response = {
//         statusCode: 200,
//         headers: {},
//         body: JSON.stringify(posts),
//         isBase64Encoded: false,
//       };
//
//       callback(null, response)
//     } else {
//       callback(mediumError)
//     }
//   }
//
//   request({ url, json: true }, respond)
// }
//
// exports.handler = handler
exports.handler = (event, context, callback) => {
  console.log(event)
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({msg: "Hello, World!"})
  })
}
