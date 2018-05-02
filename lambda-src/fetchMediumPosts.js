import fetch from 'isomorphic-fetch'

const mediumUsername = 'stijn.koopal'
const mediumUrl = `https://medium.com/@${mediumUsername}/latest?format=json`

const respond = (statusCode, jsonBody) => ({
  statusCode,
  headers: {},
  body: JSON.stringify(jsonBody),
  isBase64Encoded: false,
})

export const handler = async () => {
  const mediumResponse = await fetch(mediumUrl)
  if (!mediumResponse.ok) {
    return respond(503, { error: 'Unable to reach medium' })
  }

  const responseText = await mediumResponse.text();
  const json = JSON.parse(responseText.replace('])}while(1);</x>', ''))
  const posts = Object.values(json.payload.references.Post)

  return respond(200, posts)
}
