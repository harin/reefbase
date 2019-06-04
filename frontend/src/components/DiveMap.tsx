import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import DestinationCard from '../DestinationCard';
import {getDestination, ILocation, ICity} from '../api'
import DiveFlag from './DiveFlag'
import { meanBy } from 'lodash-es';


interface Props {
    locations: ILocation[], 
    centerCoord?: { lat: number, lng: number},
    activeSite?: ILocation,
    setActiveLocation?: (site?: ILocation)=>void,
    activeSiteCountry?: string,
    activeSiteCity?: string,
    onGoogleApiLoaded?: ({ map , maps }: { map: any, maps: any }) => void
    defaultZoom?: number,
    autoZoom?: boolean
}

function DiveMap({ 
        locations, 
        centerCoord,
        activeSite,
        setActiveLocation,
        activeSiteCountry,
        activeSiteCity,
        onGoogleApiLoaded,
        defaultZoom,
        autoZoom
    } : Props ) {

    if (autoZoom === true && locations.length > 0) {
        const lat = meanBy(locations, 'lat')
        const lng = meanBy(locations, 'lng')

        centerCoord = { lat, lng }
    }

    return (
        <div>
           <div style={{ height: '100vh', width: '100%', position: 'fixed', top: 0 }}>
           {locations != null ?
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCaxeoUHkl2GK3sKFaNvLfoRWMTm0EbzK0' }}
                    defaultCenter={centerCoord}
                    defaultZoom={defaultZoom}
                    hoverDistance={5}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({map, maps}) => {
                        if (autoZoom === true) {
                            const bounds = new maps.LatLngBounds()
                            locations.forEach((diveSite) => {
                                console.log(diveSite.lat, diveSite.lng)
                                bounds.extend({ lat: diveSite.lat, lng: diveSite.lng })
                            })
                            map.fitBounds(bounds)
                        }

                        if (onGoogleApiLoaded != null) 
                            onGoogleApiLoaded({ map, maps })
                    }}
                >
                {
                    locations.map(site => <DiveFlag 
                        key={site.id} 
                        lat={site.lat} 
                        lng={site.lng} 
                        site={site} 
                        clickHandler={setActiveLocation}/>
                    )
                }
                </GoogleMapReact>
           :false}
            </div>
            <div id="content">
            
            {activeSite != null && activeSiteCountry != null && activeSiteCity != null &&
            <section className="section">
                <div className="container is-fluid">
                    <div className="columns">
                        <div className="column is-three-quarters"></div>
                        <div className="column">
                            <div className="tile box is-vertical" id="main-content">
                                <span className="icon"
                                    style={{
                                        position: 'absolute',
                                        right: 15,
                                        cursor: 'pointer',
                                        color: '#363636'
                                    }}
                                    onClick={() => {
                                        if (setActiveLocation != null) setActiveLocation(undefined)
                                    }}
                                >
                                    <i className="far fa-times-circle"></i>
                                </span>
                               <DestinationCard 
                                    country={activeSiteCountry}
                                    city={activeSiteCity}
                                    site={activeSite} 
                                    isLoggedIn={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            }
            </div>
        </div>
    );
}

export default DiveMap
