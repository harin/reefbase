// import { number } from "prop-types";

export interface IUser {
  id: number;
  username: string;
  access_token: string;
}

export interface ILocation {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

export interface ICity extends ILocation {
  divesite_set?: IDiveSite[];
  zoom_level: number;
  country_name?: string;
}

export interface IDiveSite extends ILocation {
  id: number;
  lat: number;
  lng: number;
  name: string;
  country_name?: string;
  city_name?: string;
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

export interface IDiveLog {
  date: string;
  user_id?: number; // some times can use session instead
  divesite_id: number;
  time?: string;
  observations?: string;
  meta?: string;
  rating?: number
}

// export enum LocationTypeEnum {
//   cities = 'cities',
//   countries = 'countries'
// }

export async function loadJson(path: string, options: any = {}) {
  if (options.headers == null) {
    options.headers = {};
  }

  options.headers["Content-Type"] = "application/json";

  const resp = await fetch(path, options);
  if (resp.ok) {
    const data = await resp.json();
    return data;
  }

  let error = "";
  try {
    const errorData = await resp.json();
    error = errorData.error;
  } catch (e) {
    error = resp.statusText;
  }
  throw new Error(error);
}

async function loadAuthJson(
  path: string,
  accessToken: string,
  options: any = {}
) {
  if (options.headers == null) {
    options.headers = {};
  }
  options.headers["Authorization"] = `Bearer ${accessToken}`;
  return loadJson(path, options);
}

export async function getCountries(
  params: { page_size: string } = { page_size: "200" }
): Promise<APIResults<ICity>> {
  const paramsObj = new URLSearchParams(params);
  return loadJson(`/api/countries?${paramsObj.toString()}`);
}

export async function getCities(
  params: { country_name: string; page_size: string } = {
    country_name: "Thailand",
    page_size: "10"
  }
): Promise<APIResults<ICity>> {
  const paramsObj = new URLSearchParams(params);
  const data = await loadJson(`/api/cities?${paramsObj.toString()}`);
  data.results = data.results.map((datum: ICity) => {
    datum.country_name = params.country_name;
    return datum;
  });
  return data;
}

export async function getDestination(
  country_name: string,
  city_name: string
): Promise<APIResults<ICity>> {
  const paramsObj = new URLSearchParams({
    country_name,
    city_name,
    include_divesites: "true"
  });
  const data = await loadJson(`/api/cities?${paramsObj.toString()}`);
  if (data.results.length > 0) {
    data.results = data.results.map((result: ICity) => {
      if (result.divesite_set == null) return result;
      result.divesite_set = result.divesite_set.map((datum: IDiveSite) => {
        datum.country_name = country_name;
        datum.city_name = city_name;
        return datum;
      });
      return result;
    });
  }

  return data;
}

export async function getDiveSites(query?: any) {
  const queryObj = new URLSearchParams(query);
  return loadJson("/api/divesites?" + queryObj.toString());
}

export async function getDiveLogs() {
  return loadJson('/api/divelogs')
}



function getCookie(name: string) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
export async function createDiveLog(diveLog: IDiveLog) {
  const csrftoken = getCookie('csrftoken') || ''
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('X-CSRFToken', csrftoken)
  const options: RequestInit = { 
    method: 'POST',
    body: JSON.stringify(diveLog),
    headers
  }
  const resp = await fetch('/api/divelogs/', options)

  if (resp.ok) {
    const data = await resp.json()
    return data
  }

  if (resp.status == 400) {
    const errors = await resp.json()
    const formikError:any = {}
    Object.keys(errors).forEach((key) => {
      formikError[key] = errors[key][0]
    })
    return { errors: formikError }
  }
  // handle other errors
}

export const Note = {
  async updateNote({
    diveSiteId,
    user,
    content
  }: {
    diveSiteId: number;
    user: IUser;
    content: string;
  }): Promise<void> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.access_token}`
    };
    const body = JSON.stringify({ content });
    const data = await loadJson(
      `/api/notes/divesites/${diveSiteId}/users/${user.id}`,
      {
        method: "POST",
        headers,
        body
      }
    );
    return data;
  },
  async getNote({
    diveSiteId,
    user
  }: {
    diveSiteId: number;
    user: IUser;
  }): Promise<string> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.access_token}`
    };
    const data = await loadJson(
      `/api/notes/divesites/${diveSiteId}/users/${user.id}`,
      { headers, methods: "POST" }
    );
    if (data == null) {
      return "";
    }
    return data.content;
  }
};


