
const HOST = process.env.NODE_ENV == 'development' ? 'http://localhost:5000' : ''

async function getDestinations(query) {
    const options = {
        'headers': {
            'Content-Type': 'application/json'
        },
    } 
    const resp = await fetch(`${HOST}/api/sites`, options)
    const data = await resp.json()

    console.log(data)
}

getDestinations()
