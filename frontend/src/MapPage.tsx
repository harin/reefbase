import React, { useState, useEffect } from "react";
import DiveMap from "./components/DiveMap";
import DestinationCard from './DestinationCard';
import distance from "./distance";
import { getDiveSite, getDiveSites, IDiveSite } from "./lib/api";
import * as querystring from 'query-string'
import { withRouter } from 'react-router-dom'
import { calculateMeterPerPixel } from './lib/utils'


// interface BubbleProps {
//   diveSite: IDiveSite;
// }

// const MapBubbleContent = (props: BubbleProps) => {
//   const { diveSite } = props

//   const [isLoading, setIsLoading] = useState(false)
//   const [fullSiteInfo, setFullSiteInfo] = useState({} as IDiveSite)

//   useEffect(() => {
//     (async () => {
//       setIsLoading(true)
//       const fullSite: IDiveSite = await getDiveSite(diveSite.id)
//       setIsLoading(false)
//       setFullSiteInfo(fullSite)
//     })()
//   }, [diveSite])  

//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//       }}
//     >
//       <h3 
//         style={{ flex: 0 }}
//         className="title is-4">{diveSite.name}</h3>
//       <div className={isLoading ? 'is-loading' : ''}
//         style={{
//           height: '100%',
//           flex: '1 0 auto'
//         }} 
//       >

//       </div>
//     </div>
//   )
// }



const MapPage = function(props: any) {
  const { location } = props;
  const { lat, lng, zoom } = querystring.parse(location.search)

  const effectiveLat = Number(lat) || 26.5293775 //florida
  const effectiveZoom = Number(zoom) || 10

  const [activeSite, setActiveSite] = useState(null as any)
  const [searchCircle, setSearchCircle] = useState({
    lat: effectiveLat,
    lng: Number(lng || -82.8939276),
    radius: calculateMeterPerPixel(effectiveLat, effectiveZoom)
  });
  const [diveSites, setDiveSites] = useState([] as IDiveSite[]);

  function setSearchCircleFromMap(map: any) {
    const center = map.getCenter().toJSON();
    const bound = map.getBounds().toJSON();
    const latDist = distance(bound.west, 0, bound.east, 0, "K");
    const lngDist = distance(0, bound.north, 0, bound.south, "K");
    const radius = Math.min(latDist, lngDist);
    center.radius = radius;
    setSearchCircle(center);
  }

  function onLoad({ map, maps }: { map: any; maps: any }) {
    setSearchCircleFromMap(map);

    map.addListener("dragend", () => setSearchCircleFromMap(map));
    map.addListener("zoom_changed", () => setSearchCircleFromMap(map));
    map.addListener("click", () => setActiveSite(undefined))
  }

  async function updateDiveSites() {
    const query = Object.assign({}, searchCircle) as any;
    query.page_size = 100;
    query.include_location = "true";

    const data = await getDiveSites(query);
 
    setDiveSites(data.results);
  }

  useEffect(() => {
    (async function() {
      updateDiveSites();
    })();
  }, []);

  return (
    <>
    <DiveMap
      locations={diveSites}
      activeSite={activeSite}
      centerCoord={{ lat: searchCircle.lat, lng: searchCircle.lng }}
      activeSiteCountry={""}
      activeSiteCity={""}
      setActiveLocation={(activeSite: any) => setActiveSite(activeSite)}
      onGoogleApiLoaded={onLoad}
      onClickUpdate={() => updateDiveSites()}
      defaultZoom={8}
    >
      {/* { activeSite &&
          //@ts-ignore
          <div
            className='speech-bubble'
            lat={activeSite.lat} 
            lng={activeSite.lng}
            style={{
              background: 'white',
              padding: '10px',
              borderRadius: '10px',
              width: 300,
              height: 200,
              position: 'relative',
              top: -230,
              left: -145,
              boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.10)',
              cursor: 'default',
              pointerEvents: 'all'
            }}
          >
             <MapBubbleContent diveSite={activeSite} />
          </div>

        } */}
     
    </DiveMap>
     {activeSite != null && (
      <section className="section" id="content">
        <div className="container is-fluid">
          <div className="columns">
            <div className="column is-three-quarters" />
            <div className="column">
              <div className="tile box is-vertical" id="main-content">
                <span
                  className="icon"
                  style={{
                    position: "absolute",
                    right: 15,
                    cursor: "pointer",
                    color: "#363636"
                  }}
                  onClick={() => setActiveSite(undefined)}
                >
                  <i className="far fa-times-circle" />
                </span>
                <DestinationCard site={activeSite} />
              </div>
            </div>
          </div>
        </div>
      </section>
    )}
    </>
  );
};

export default withRouter(MapPage);
