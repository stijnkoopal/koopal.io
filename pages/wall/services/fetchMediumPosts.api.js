import window from 'global'
import fetchWithTimeout from '../../_services/fetchWithTimeout'

const baseUrl = () => window.location.origin

const fetchMediumPosts = async () => {
  const response = await fetchWithTimeout(`${baseUrl()}/.netlify/functions/fetchMediumPosts`)
  const posts = await response.json()

  return posts
}

export default fetchMediumPosts
