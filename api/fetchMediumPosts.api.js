import fetch from 'isomorphic-fetch'
import window from 'global'

const baseUrl = () => window.location.origin

const fetchMediumPosts = async () => {
  const response = await fetch(`${baseUrl()}/.netlify/functions/fetchMediumPosts`)
  return response.json()
}

export default fetchMediumPosts
