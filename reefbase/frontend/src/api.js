
// const HOST = process.env.NODE_ENV == 'development' ? 'http://localhost:5000' : ''

async function loadJson(path, options) {
    const resp = await fetch(path, options)
    const data = await resp.json()
    return data 
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
        const resp = await fetch('/auth/api-register', options)
        const data = await resp.json()
        return this.login(email, password)        
    },
    async login(email, password) {
      const options = {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
      }
      const resp = await fetch('/auth/api-login', options)
      const data = await resp.json()
      if (resp.status >= 400) {
        if (data != null) throw Error(data.msg)
        throw Error('Unknown Error has occured.')
      }
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
      const resp = await fetch('/auth/api-logout', options)
      const data = await resp.json() 
    }
  };