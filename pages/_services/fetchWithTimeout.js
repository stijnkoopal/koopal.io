import fetch from 'isomorphic-fetch'

const fetchWithTimeout = (url, options = {}, timeout = 7000) =>
  Promise.race([
    fetch(url, options),
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout)),
  ])

export default fetchWithTimeout
