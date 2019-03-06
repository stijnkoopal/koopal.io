/* eslint-disable no-console */

const giphy = {
  baseURL: 'https://api.giphy.com/v1/gifs/',
  key: 'dc6zaTOxFJmzC',
  tag: 'curious little mouse',
  type: 'random',
  rating: 'pg-13',
}

const giphyURL = encodeURI(`${giphy.baseURL}${giphy.type}?api_key=${giphy.key}&tag=${giphy.tag}&rating=${giphy.rating}`)

export default function() {
  console.log("Ah you are a curious little mouse aren't ya!")
  console.log('Drop me a line;) stijn.koopal@gmail.com')

  return fetch(giphyURL)
    .then(r => r.json())
    .then(json => json.data)
    .then(data => {
      console.log('/giphy curious little mouse')
      console.log(
        '%c       ',
        `font-size: ${data.image_height}px; background: url(${data.image_original_url}) no-repeat;`,
      )
    })
}
