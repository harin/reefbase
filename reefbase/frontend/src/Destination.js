import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import diveflag from './diverflag.png'
import DestinationCard from './DestinationCard';

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
    let { sites } = props
    sites = sites.map((site) => {
        site['country'] = props.match.params['country']
        site['destinationName'] = props.match.params['name']
        return site
    })
    const site = sites[0]

    const [activeSite, setActiveSite] = useState(site)

    return (
        <div>
           <div style={{ height: '100vh', width: '100%', position: 'fixed', top: 0 }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCaxeoUHkl2GK3sKFaNvLfoRWMTm0EbzK0' }}
                    defaultCenter={[site.lat, site.lng]}
                    defaultZoom={11}
                >
                {
                    sites.map(site => <Flag lat={site.lat} lng={site.lng} site={site} clickHandler={() => {setActiveSite(site)}}/>)
                }
                </GoogleMapReact>
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
