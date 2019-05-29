import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import DestinationCard from '../DestinationCard';
import {getDestination, IDiveSite, ICity} from '../api'
import DiveFlag from './DiveFlag'



function DiveMap({ 
        diveSites, 
        centerCoord,
        activeSite,
        setActiveSite,
        activeSiteCountry,
        activeSiteCity,
        onGoogleApiLoaded,
        defaultZoom
    } : 
    { 
        diveSites: IDiveSite[], 
        centerCoord: { lat: number, lng: number},
        activeSite?: IDiveSite,
        setActiveSite?: (site?: IDiveSite)=>void,
        activeSiteCountry?: string,
        activeSiteCity?: string,
        onGoogleApiLoaded?: ({ map , maps }: { map: any, maps: any }) => void
        defaultZoom: number
    } ) {

    return (
        <div>
           <div style={{ height: '100vh', width: '100%', position: 'fixed', top: 0 }}>
           {diveSites != null ?
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCaxeoUHkl2GK3sKFaNvLfoRWMTm0EbzK0' }}
                    defaultCenter={centerCoord}
                    defaultZoom={defaultZoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={onGoogleApiLoaded}
                >
                {
                    diveSites.map(site => <DiveFlag 
                        key={site.id} 
                        lat={site.lat} 
                        lng={site.lng} 
                        site={site} 
                        clickHandler={setActiveSite}/>
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
                                        top: 25,
                                        cursor: 'pointer',
                                        color: '#363636'
                                    }}
                                    onClick={() => {
                                        if (setActiveSite != null) setActiveSite(undefined)
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
