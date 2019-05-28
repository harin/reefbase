// import { number } from "prop-types";

export interface IUser {
  id: number;
  username: string;
  access_token: string;
}

export interface ICity {
  id: number;
  lat: number;
  lng: number;
  divesite_set?: [IDiveSite];
  zoom_level: number;
  country_name?: string;
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

export interface APIResults<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}


// export enum LocationTypeEnum {
//   cities = 'cities',
//   countries = 'countries'
// }

export async function loadJson(path: string, options:any = {}) {
  
  if (options.headers == null) {
    options.headers = {}
  }

  options.headers['Content-Type'] = 'application/json'

  const resp = await fetch(path, options)
  if (resp.ok) {
    const data = await resp.json()
    return data
  }

  let error = ''
  try {
    const errorData = await resp.json() 
    error = errorData.error
  } catch (e) {
    error = resp.statusText
  }
  throw new Error(error)
}

async function loadAuthJson(path:string , accessToken: string, options:any = {}) {
  if (options.headers == null) {
    options.headers = {}
  }
  options.headers['Authorization'] = `Bearer ${accessToken}` 
  return loadJson(path, options)
}

export async function getCountries(params:{ limit: string } = { limit: '10' }): Promise<APIResults<ICity>> {
  const paramsObj = new URLSearchParams(params)
  return loadJson(`/api/countries?${paramsObj.toString()}`)
}

export async function getCities(params:{ country_name: string, limit: string } = { country_name: 'Thailand', limit: '10' }): Promise<APIResults<ICity>> {
  const paramsObj = new URLSearchParams(params)
  const data = await loadJson(`/api/cities?${paramsObj.toString()}`)
  data.results = data.results.map((datum: ICity) => {
    datum.country_name = params.country_name
    return datum
  })
  return data
}

export async function getDestination(country_name:string, city_name:string): Promise<APIResults<ICity>> {
  const paramsObj = new URLSearchParams({ country_name, city_name, include_divesites: 'true' })
  const data = await loadJson(`/api/cities?${paramsObj.toString()}`)
  return data
}

export async function getDiveSites(query?:any) {
  const queryObj = new URLSearchParams(query)
  return loadJson('/api/divesites?' + queryObj.toString())
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
    return data
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
    return data
  },
  async isTokenValid(accessToken: string): Promise<boolean> {
    const { valid } = await loadAuthJson('/auth/check-token', accessToken)
    return valid
  }
};