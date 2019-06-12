import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import GoogleMapReact, { ClickEventValue } from 'google-map-react';
import {getDestination, ILocation, ICity} from '../api'
import DiveMarker from './DiveMarker'
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
    onClickUpdate?: () => void;
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
        history,
        onClickUpdate
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

    return (
      <>
      { onClickUpdate != null &&
        <div className="container is-fluid">
          <div className="columns">
            <div className="column is-two-fifths" />
            <div className="column is-one-fifths">
              <div className="tile box is-vertical" id="main-content">
                <button
                  className="button"
                  style={{
                    zIndex: 10,
                    border: "none",
                    background: "rgba(21,60,106,0.9)",
                    color: "white"
                  }}
                  onClick={() => onClickUpdate()}
                >
                  Redo Search Current Area
                </button>
              </div>
            </div>
            <div className="column is-two-fifths" />
          </div>
        </div>
      }
        <div>
          <div
            style={{
              height: "100vh",
              width: "100%",
              position: "fixed",
              top: 0
            }}
          >
            {locations != null && (
              <GoogleMapReact
                options={{ styles: googleMapStyle }}
                bootstrapURLKeys={{
                  key: "AIzaSyCaxeoUHkl2GK3sKFaNvLfoRWMTm0EbzK0"
                }}
                defaultCenter={centerCoord}
                defaultZoom={(zoom && Number(zoom)) || defaultZoom}
                hoverDistance={5}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => {
                  if (autoZoom === true && hasLocationQuery === false) {
                    const bounds = new maps.LatLngBounds();

                    if (locations.length == 1) {
                        map.setCenter(locations[0])
                        map.setZoom(8)
                    } else {
                        locations.forEach(diveSite => {
                        bounds.extend({
                            lat: diveSite.lat,
                            lng: diveSite.lng
                        });
                        });
                        map.fitBounds(bounds);
                        const zoom = map.getZoom()
                        if (zoom > 12) map.setZoom(8)
                    }
                  }

                  if (onGoogleApiLoaded != null) {
                    onGoogleApiLoaded({ map, maps });
                  }

                  map.addListener("bounds_changed", () => {
                    // @ts-ignore
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                      const { lat, lng } = map.getCenter();
                      const zoom = map.getZoom();
                      const search = querystring.stringify({
                        zoom,
                        lat: lat(),
                        lng: lng()
                      });
                      history.replace(location.pathname + "?" + search);
                    }, 500);
                  });
                }}
              >
                {locations.map(site => (
                  <DiveMarker
                    zoom={zoom}
                    key={site.id}
                    lat={site.lat}
                    lng={site.lng}
                    site={site}
                    clickHandler={setActiveLocation}
                  />
                ))}
                  {children}
              </GoogleMapReact>
            )}
          </div>
        </div>
      </>
    );
}

//@ts-ignore
export default withRouter(DiveMap);
