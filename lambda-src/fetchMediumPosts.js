import fetch from 'isomorphic-fetch'

const mediumUsername = 'stijn.koopal'
const mediumUserBase = `https://medium.com/@${mediumUsername}`
const latestBlogPostsUrl = `${mediumUserBase}/latest?format=json`

const blogPostUrl = ({ uniqueSlug }) => `${mediumUserBase}/${uniqueSlug}`
const blogImageUrl = ({ virtuals: { previewImage: { imageId }}}) => `https://cdn-images-1.medium.com/max/800/${imageId}`

const respond = (statusCode, jsonBody) => ({
  statusCode,
  headers: {},
  body: JSON.stringify(jsonBody),
  isBase64Encoded: false,
})

export const handler = async () => {
  const mediumResponse = await fetch(latestBlogPostsUrl)
  if (!mediumResponse.ok) {
    return respond(503, { error: 'Unable to reach medium' })
  }

  const responseText = await mediumResponse.text();
  const json = JSON.parse(responseText.replace('])}while(1);</x>', ''))
  const posts = Object.values(json.payload.references.Post)
    .map(post => ({
      ...post,
      blogUrl: post.mediumUrl || blogPostUrl(post),
      imageUrl: blogImageUrl(post)
    }))

  return respond(200, posts)
}
