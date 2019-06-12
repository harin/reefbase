import React, { useState, useEffect } from "react";
import DiveMap from "./components/DiveMap";
import distance from "./distance";
import { getDiveSite, getDiveSites, IDiveSite } from "./api";


interface BubbleProps {
  diveSite: IDiveSite;
}

const MapBubbleContent = (props: BubbleProps) => {
  const { diveSite } = props

  const [isLoading, setIsLoading] = useState(false)
  const [fullSiteInfo, setFullSiteInfo] = useState({} as IDiveSite)

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const fullSite: IDiveSite = await getDiveSite(diveSite.id)
      setIsLoading(false)
      setFullSiteInfo(fullSite)
    })()
  }, [diveSite])  

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h3 
        style={{ flex: 0 }}
        className="title is-4">{diveSite.name}</h3>
      <div className={isLoading ? 'is-loading' : ''}
        style={{
          height: '100%',
          flex: '1 0 auto'
        }} 
      >

      </div>
    </div>
  )
}



const MapPage = function(props: any) {
  const [activeSite, setActiveSite] = useState(null as any)
  const [searchCircle, setSearchCircle] = useState({
    lat: 26.5293775, //florida
    lng: -82.8939276,
    radius: 240
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
        { activeSite &&
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
        }
      </DiveMap>
  );
};

export default MapPage;
