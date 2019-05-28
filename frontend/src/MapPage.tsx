import React, { useState, useEffect } from 'react'
import DiveMap from './components/DiveMap';
import distance from './distance'
import { getDiveSites, IDiveSite } from './api'

const MapPage = function(props: any) {
    
    const [activeSite, setActiveSite] = useState(null as any)

    const [searchCircle, setSearchCircle] = useState(
        {
            lat: 0,
            lng: 0,
            radius: 10
        }
    )
    const [diveSites, setDiveSites] = useState([] as IDiveSite[])

    function setSearchCircleFromMap(map: any) {
        const center = map.getCenter().toJSON()
        const bound = map.getBounds().toJSON()
        const latDist = distance(bound.west,0, bound.east,0, 'K')
        const lngDist = distance(0, bound.north, 0, bound.south, 'K')
        const radius = Math.min(latDist, lngDist)
        center.radius = radius
        // console.log('set circle to', center)
        setSearchCircle(center)
    }

    function onLoad({ map, maps }: { map: any, maps: any}) {
        setSearchCircleFromMap(map)

        map.addListener('dragend', () => setSearchCircleFromMap(map))
        map.addListener('zoom_changed', () => setSearchCircleFromMap(map))
    }

    async function updateDiveSites() {
        const query = Object.assign({}, searchCircle) as any
        query.page_size = 100

        const data = await getDiveSites(query)
        // console.log('new dive sites', data)

        // const center: IDiveSite = {
        //     id: 1,
        //     lat: searchCircle.lat,
        //     lng: searchCircle.lng,
        //     name: 'center',
        //     destination: '',
        //     country: ''
        // }

        setDiveSites(data.results)
        // setDiveSites([center])
    }

    useEffect(() => {
        (async function() {
           updateDiveSites()
        })()
    }, [])

    return (
        <>
        <button
            className="button"
            style={{
                position: 'fixed',
                top: 100,
                left: 1000,
                zIndex: 10
            }}
            onClick={
                () => updateDiveSites()
            }
        >Update</button>
        <DiveMap
            diveSites={diveSites}
            activeSite={activeSite}
            centerCoord={{lat: 1, lng:1}}
            activeSiteCountry={''}
            activeSiteCity={''}
            setActiveSite={(activeSite: any) => setActiveSite(activeSite)}
            onGoogleApiLoaded={onLoad}
            defaultZoom={6}
        />
        </>
    )
}

export default MapPage
