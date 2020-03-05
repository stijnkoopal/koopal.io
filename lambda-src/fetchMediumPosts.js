/* eslint-disable import/prefer-default-export */
import fetch from 'isomorphic-fetch'
import resume from '../static/resume.json'

const findMediumProfile = profile => profile.network === 'Medium'
const mediumUsername = resume.basics.profiles.filter(findMediumProfile)[0].username
const latestBlogPostsUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`

const respond = (statusCode, jsonBody) => ({
  statusCode,
  headers: {},
  body: JSON.stringify(jsonBody),
  isBase64Encoded: false,
})

export const handler = async () => {
  const mediumResponse = await fetch(latestBlogPostsUrl)
  if (!mediumResponse.ok) {
    return respond(503, { error: 'Unable to reach medium', response: {status: mediumResponse.status, url: mediumResponse.url} })
  }

  const responseJson = await mediumResponse.json()
  const posts = responseJson.items
    .filter(post => post.categories.length > 0)
    .map(post => ({
      id: post.guid,
      title: post.title,
      updatedAt: post.pubDate,
      blogUrl: post.link,
      imageUrl: post.thumbnail,
    }))

  return respond(200, posts)
}
