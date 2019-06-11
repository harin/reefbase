import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import GoogleMapReact, { ClickEventValue } from 'google-map-react';
import DestinationCard from '../DestinationCard';
import {getDestination, ILocation, ICity} from '../api'
import DiveFlag from './DiveMarker'
import { meanBy } from 'lodash-es';
import mapStyle from './google_map_style.json'
import * as H from 'history'
import * as querystring from 'query-string'


interface Props {
    locations: ILocation[], 
    centerCoord?: { lat: number, lng: number},
    activeSite?: ILocation,
    setActiveLocation?: (site?: ILocation)=>void,
    activeSiteCountry?: string,
    activeSiteCity?: string,
    onGoogleApiLoaded?: ({ map , maps }: { map: any, maps: any }) => void
    defaultZoom?: number,
    autoZoom?: boolean,
    children?: React.ReactNode,
    location: H.Location,
    history: H.History
}

const googleMapStyle = mapStyle

var timeout: any;
function DiveMap({ 
        locations, 
        centerCoord,
        activeSite,
        setActiveLocation,
        activeSiteCountry,
        activeSiteCity,
        onGoogleApiLoaded,
        defaultZoom,
        autoZoom,
        children,
        location,
        history
    } : Props ) {

    if (centerCoord == null) centerCoord = { lat: 0, lng: 0 }

    if (autoZoom === true && locations.length > 0) {
        const lat = meanBy(locations, 'lat')
        const lng = meanBy(locations, 'lng')
        centerCoord = { lat, lng }
    }

    var hasLocationQuery = false
    const { lat, lng, zoom } = querystring.parse(location.search)
    if (lat != null && lng != null && zoom != null)  {
        centerCoord.lat = Number(lat)
        centerCoord.lng = Number(lng)
        hasLocationQuery = true
    }

    const [urlTimeout, setUrlTimeout] = useState(0)

    return (
        <div>
           <div style={{ height: '100vh', width: '100%', position: 'fixed', top: 0 }}>
           {locations != null &&
                <GoogleMapReact
                    options={{ styles: googleMapStyle }}
                    bootstrapURLKeys={{ key: 'AIzaSyCaxeoUHkl2GK3sKFaNvLfoRWMTm0EbzK0' }}
                    defaultCenter={centerCoord}
                    defaultZoom={zoom && Number(zoom) || defaultZoom}
                    hoverDistance={5}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({map, maps}) => {
                        if (autoZoom === true && hasLocationQuery === false) {
                            const bounds = new maps.LatLngBounds()
                            locations.forEach((diveSite) => {
                                bounds.extend({ lat: diveSite.lat, lng: diveSite.lng })
                            })
                            map.fitBounds(bounds)
                        }

                        if (onGoogleApiLoaded != null) {
                            onGoogleApiLoaded({ map, maps })
                        }

                        map.addListener('bounds_changed', () => {
                            // @ts-ignore
                            clearTimeout(timeout)
                            timeout = setTimeout(() => {
                                const { lat, lng } = map.getCenter()
                                const zoom = map.getZoom()
                                const search = querystring.stringify({ zoom, lat: lat(), lng: lng() })
                                history.replace(location.pathname + '?' + search)
                            }, 500)
                            // @ts-ignore
                            // setUrlTimeout(timeout)
                        })
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
           }
            </div>
            <div id="content">
                {children}
            </div>
        </div>
    );
}

//@ts-ignore
export default withRouter(DiveMap);
