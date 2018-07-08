import window from 'global'
import fetchWithTimeout from '../../_services/fetchWithTimeout'

const baseUrl = () => window.location.origin

const fetchMediumPosts = async () => {
  const response = await fetchWithTimeout(`${baseUrl()}/.netlify/functions/fetchMediumPosts`)
  return response.json()
}

export default fetchMediumPosts
