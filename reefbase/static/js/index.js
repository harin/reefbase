var infoWindows = []

const routes = {
    '/': HTMLFormElement,
}

var app = new Vue({
    el: '#page',
    data: {
        activeSite: null,
        user: user
    },
    methods: {
        updateSite: updateSite,
        saveSite: saveSite
    }
  })

window.app = app;

async function saveSite(sites) {
    if (app.user == null) return
    const body = JSON.stringify(app.activeSite.note)
    if (body == '') return

    const options = { 
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body }
    const resp = await fetch(`/api/site-notes/${app.activeSite.id}/users/${app.user.id}`, options)
    const data = await resp.json()
}

async function loadSites() {
    const resp = await fetch('/api/sites')
    const data = await resp.json()
    app.sites = data
    console.log('init map')
    return data
}

async function getNote(siteId) {
    const options = { method: 'GET' }
    const resp = await fetch(`/api/site-notes/${siteId}/users/${app.user.id}`, options)
    const data = await resp.json()
    return data
}

async function showSite(siteName) {
    const site = app.sites.find(s => s.name == siteName)
    if (site.note == null) {
        const note = await getNote(site.id) 
        site.note = note || { content: '' }
    }
    app.activeSite = site
}

function updateSite() {
    app.sites = app.sites.map((s) => {
        if (s.name == app.activeSite.name) {
            return app.activeSite
        }
        return s
    })
    // save(app.sites)
}

// Initialize and add the map
async function initMap() {
    var cozumel = { lat: 20.423250, lng: -86.924084 };
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 11, center: cozumel });
        const sites = await loadSites()
        markers = sites.map((site) => {
        const position = {
            lat: Number(site.lat),
            lng: Number(site.lng)
        }
        const icon = '/static/img/diverflag.png'
        var marker = new google.maps.Marker({
            title: site.name,
            position, 
            map,
            icon
        });

        const infowindow = new google.maps.InfoWindow({
            content: site.name
        });

        infoWindows.push(infowindow)

        marker.addListener('click', function() {
            infoWindows.forEach((window) => window.close())

            infowindow.open(map, marker);
            showSite(marker.title)
        });

        return marker
    })
}