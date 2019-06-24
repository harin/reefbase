import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import GoogleMapReact, { ClickEventValue } from 'google-map-react';
import {getDestination, ILocation, ICity} from '../lib/api'
import DiveMarker from './DiveMarker'
import { meanBy, groupBy, flatMap } from 'lodash-es';
import mapStyle from './google_map_style.json'
import * as H from 'history'
import * as querystring from 'query-string'
import * as turf from '@turf/turf'

function calculateMeterPerPixel(lat:number, zoom:number) {
  console.log(lat, zoom)
  console.log(Math.cos(lat * Math.PI / 180))
  console.log(Math.pow(2,zoom))
  const meterPerPixel = 156543.03392 * Math.cos(lat * Math.PI / 180) / Math.pow(2, zoom)
  return meterPerPixel
}

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

    const [dbScanRadiusKM, updateDbScanRadius] = useState(0.01)


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

    const features = locations.map(loc => {
      return turf.point([loc.lat, loc.lng], loc)
    })
    

    // @ts-ignore
    const collection = turf.clustersDbscan(
      turf.featureCollection(features),
      dbScanRadiusKM 
    )
    const clusters = groupBy(collection.features, 'properties.cluster')
    console.log({ clusters })
    const noises = collection.features.filter((feature: any) => 
      feature.properties.dbscan == 'noise'
    )
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

                      const meterPerPixel = calculateMeterPerPixel(lat(), zoom)
                      const clusterRadiusPixel = 10
                      const clusterRadiusKM = meterPerPixel * clusterRadiusPixel / 1000
                      console.log({ clusterRadiusKM })
                      updateDbScanRadius(clusterRadiusKM)
                    }, 500);
                  });
                }}
              >
                {
                  Object.keys(clusters)
                  .filter((key) => key != 'undefined')
                  .map((key: string) => {
                    const cluster: any[] = clusters[key]
                    const collection = turf.featureCollection(cluster)
                    const bbox = turf.bbox(collection)
                    const bboxPolygon = turf.bboxPolygon(bbox)
                    console.log({ bbox, bboxPolygon})

                    //@ts-ignore
                    const cg = turf.centerOfMass(collection)
                    let names = cluster.map((feature) => {
                      return feature.properties.name
                    })
                    if (names.length > 5) {
                      names = names.slice(0,5)
                      names.push('...')
                    }
                    const site = {
                      name: names.join(', '),
                      lat: cg.geometry.coordinates[0],
                      lng: cg.geometry.coordinates[1],
                      id: -1
                    }
                    return <DiveMarker
                      site={site}
                      zoom={zoom}
                      key={key}
                      lat={site.lat}
                      lng={site.lng}
                      //@ts-ignore
                      text={String(cluster.length)}
                      diameter={20}
                    />

                  })
                }
                {noises.map((point:any) => {

                  const site = point.properties
                  let color = 'red'
                  if (site.dbscan == 'noise') {
                    color='green'
                  }

                  return <DiveMarker
                    zoom={zoom}
                    key={site.id}
                    lat={site.lat}
                    lng={site.lng}
                    color={color}
                    site={site}
                    clickHandler={() => {
                      if (setActiveLocation != null)
                        setActiveLocation(site)
                    }}
                  />
                })}
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
