import React, { useState, useEffect } from "react";
import DiveMap from "./components/DiveMap";
import distance from "./distance";
import { getDiveSites, IDiveSite } from "./api";

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
    // console.log('set circle to', center)
    setSearchCircle(center);
  }

  function onLoad({ map, maps }: { map: any; maps: any }) {
    setSearchCircleFromMap(map);

    map.addListener("dragend", () => setSearchCircleFromMap(map));
    map.addListener("zoom_changed", () => setSearchCircleFromMap(map));
  }

  async function updateDiveSites() {
    const query = Object.assign({}, searchCircle) as any;
    query.page_size = 100;
    query.include_location = "true";

    const data = await getDiveSites(query);
    // console.log('new dive sites', data)

    // const center: IDiveSite = {
    //     id: 1,
    //     lat: searchCircle.lat,
    //     lng: searchCircle.lng,
    //     name: 'center',
    //     destination: '',
    //     country: ''
    // }

    setDiveSites(data.results);
    // setDiveSites([center])
  }

  useEffect(() => {
    (async function() {
      updateDiveSites();
    })();
  }, []);

  return (
    <>
      <div className="container is-fluid">
          <div className="columns">
              <div className="column is-two-fifths"></div>
              <div className="column is-one-fifths">
                  <div className="tile box is-vertical" id="main-content">
                  <button
                      className="button"
                      style={{zIndex:10, border: 'none', background: 'rgba(21,60,106,0.9)', color: 'white'}}
                      onClick={() => updateDiveSites()}
                  >
                      Redo Search Current Area
                  </button>
                  </div>
              </div>
              <div className="column is-two-fifths"></div>
          </div>
      </div>
      <DiveMap
        diveSites={diveSites}
        activeSite={activeSite}
        centerCoord={{ lat: searchCircle.lat, lng: searchCircle.lng }}
        activeSiteCountry={""}
        activeSiteCity={""}
        setActiveSite={(activeSite: any) => setActiveSite(activeSite)}
        onGoogleApiLoaded={onLoad}
        defaultZoom={8}
      />
    </>
  );
};

export default MapPage;
