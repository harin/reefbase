
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