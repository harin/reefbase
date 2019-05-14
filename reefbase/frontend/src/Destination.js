import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import diveflag from './diverflag.png'
import DestinationCard from './DestinationCard';
import { getDiveSites, getDestination } from './api'

const Flag = ({ site, clickHandler=()=>{} })=> {

    return (
        <img 
            className="tooltip"
            onClick={clickHandler} 
            src={diveflag}
            alt='Diver Down Flag'
            data-tooltip={site.name}
            style={{
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                cursor: 'pointer'
            }}
        />
    )
}

function Destination(props) {
    const [sites, setSites] = useState([])
    const [destination, setDestination] = useState(null)
    const [activeSite, setActiveSite] = useState({})

    useEffect(() => {
        (async function() {
            const result = await getDestination(props.match.params.country, props.match.params.name)
            setDestination(result)
            setSites(result.divesites)
            if (result.divesites.length > 0) setActiveSite(result.divesites[0])
        })()
    }, [])

    console.log({ destination })
    return (
        <div>
           <div style={{ height: '100vh', width: '100%', position: 'fixed', top: 0 }}>
           {destination != null ?
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCaxeoUHkl2GK3sKFaNvLfoRWMTm0EbzK0' }}
                    defaultCenter={[destination.lat, destination.lng]}
                    defaultZoom={destination.zoom_level}
                >
                {
                    sites.map(site => <Flag 
                        key={site.id} 
                        lat={site.lat} 
                        lng={site.lng} 
                        site={site} 
                        clickHandler={() => {setActiveSite(site)}}/>
                    )
                }
                </GoogleMapReact>
           :false}
            </div>
            <div id="content">

            <section className="section">
                <div className="container is-fluid">
                    <div className="columns">
                        <div className="column is-three-quarters"></div>
                        <div className="column">
                            <div className="tile box is-vertical" id="main-content">
                               <DestinationCard site={activeSite} isLoggedIn={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        </div>
    );
}

export default Destination;
