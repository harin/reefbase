
// const HOST = process.env.NODE_ENV == 'development' ? 'http://localhost:5000' : ''

async function loadJson(path, options) {
    const resp = await fetch(path, options)
    if (resp.ok) {
      const data = await resp.json()
      return data 
    }
    const error = new Error(resp.statusText)
    error.response = resp
    throw error
}

export async function getDestinations(query) {
    return loadJson('/api/destinations')
}

export async function getDestination(country, destName) {
    return loadJson(`/api/destinations/divesites/${country}/${destName}`)
}

export async function getDiveSites(query) {
    return loadJson('/api/divesites')
}

export const auth = {
    async register({ username, email, password }) {
        const options = {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' }
        }
        const data = await loadJson('/auth/api-register', options)
        return this.login(email, password)        
    },
    async login(email, password) {
      const options = {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
      }
      const data = await loadJson('/auth/api-login', options)
      return data
    },
    async logout(cb) {
      const options = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`
        }
      }
      const data = await loadJson('/auth/api-logout', options)
    }
  };