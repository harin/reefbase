
// const HOST = process.env.NODE_ENV == 'development' ? 'http://localhost:5000' : ''

export interface IUser {
  id: number;
  username: string;
  access_token: string;
}

export interface IDestination {
  id: number;
  lat: number;
  lng: number;
  divesites?: [any];
  zoom_level: number;
}

export interface IDiveSite {
  id: number;
  lat: number;
  lng: number;
  name: string;
  destination: string;
  country: string;
}

export interface INote {
  id: number;
  content: string;
}

export interface IUser {
  id: number;
  access_token: string;
  username: string;
}

async function loadJson(path: string, options?:any) {
  const resp = await fetch(path, options)
  if (resp.ok) {
    const data = await resp.json()
    return data
  }

  let error = ''
  try {
    const errorData = await resp.json() 
    error = errorData.error
  } catch (error) {
    error = resp.statusText
  }
  throw new Error(error)
}

export async function getDestinations(query?:any): Promise<IDestination[]> {
  return loadJson('/api/destinations')
}

export async function getDestination(country:string, destName:string): Promise<IDestination> {
  return loadJson(`/api/destinations/divesites/${country}/${destName}`)
}

export async function getDiveSites(query?:any) {
  return loadJson('/api/divesites')
}

export const Note = {
  async updateNote({ diveSiteId, user, content }: { diveSiteId: number, user: IUser, content:string}): Promise<void> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.access_token}`
    }
    const body = JSON.stringify({ content })
    const data = await loadJson(`/api/notes/divesites/${diveSiteId}/users/${user.id}`, {
      method: 'POST', 
      headers, 
      body
    })
    return 
  },
  async getNote({ diveSiteId, user }: { diveSiteId: number, user: IUser }): Promise<string> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.access_token}`
    }
    const data = await loadJson(
      `/api/notes/divesites/${diveSiteId}/users/${user.id}`, 
      { headers, methods: 'POST'}
    )
    if (data == null) {
      return ''
    }
    return data.content
  }
}

export const auth = {
  async register({ username, email, password }: { username: string, email: string, password: string}) {
    const options = {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' }
    }
    const data = await loadJson('/auth/api-register', options)
    console.log('data', data)
    return this.login(email, password)
  },
  async login(email: string, password: string) {
    const options = {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    }
    const data = await loadJson('/auth/api-login', options)
    return data
  },
  async logout(accessToken: string) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }
    const data = await loadJson('/auth/api-logout', options)
  }
};