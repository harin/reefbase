import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import diveflag from "./diverflag.png";
import DestinationCard from "./DestinationCard";
import { getDestination, IDiveSite, ICity } from "./api";
import DiveMap from "./components/DiveMap";

const Flag = ({
  site,
  lat,
  lng,
  clickHandler = () => {}
}: {
  site: IDiveSite;
  lat: number;
  lng: number;
  clickHandler?: () => void;
}) => {
  return (
    <img
      className="tooltip"
      onClick={clickHandler}
      src={diveflag}
      alt="Diver Down Flag"
      data-tooltip={site.name}
      style={{
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        cursor: "pointer"
      }}
    />
  );
};

function Destination(props: any) {
  const [diveSites, setDiveSites] = useState<IDiveSite[]>([]);
  const [destination, setDestination] = useState<ICity | null>(null);
  const [activeSite, setActiveSite] = useState<any>(null);

  const { country, city } = props.match.params

  useEffect(() => {
    (async function() {
      const data = await getDestination(country, city)
      const result = data.results[0];
      setDestination(result);
      const diveSites = result.divesite_set || [];
      setDiveSites(diveSites);
      // only show on desktop
      if (diveSites.length > 0 && window.innerWidth > 768) {
        setActiveSite(diveSites[0]);
      }
    })();
  }, [props.match.params.country, props.match.params.city]);

  const breadcrumb = [
      {
          href: `/destinations`,
          name: 'Country'
      },
    {
        href: `/destinations/${country}`,
        name: country
    },
    {
        href:`/destinations/${country}/${city}`,
        name: city
    }
  ];

  return (
    <>
      <div className="level">
        <nav className="breadcrumb" aria-label="breadcrumbs">
          <ul>
            {breadcrumb.map((crumb, idx) => (
              <li
                style={{zIndex: 10}}
                key={idx}
                className={` ${idx === breadcrumb.length - 1 ? "is-active" : ""}`}
              >
                <Link
                  to={crumb.href}
                  className="title is-5"
                  style={{ padding: "10px" }}
                >
                  {crumb.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div>
        {destination != null && diveSites != null && (
          <DiveMap
            locations={diveSites}
            activeSite={activeSite}
            centerCoord={{ lat: destination.lat, lng: destination.lng }}
            activeSiteCountry={""}
            activeSiteCity={""}
            setActiveLocation={(activeSite: any) => setActiveSite(activeSite)}
            autoZoom={true}
            defaultZoom={8}
          />
        )}

        {/* <div style={{ height: '100vh', width: '100%', position: 'fixed', top: 0 }}>
           {destination != null ?
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCaxeoUHkl2GK3sKFaNvLfoRWMTm0EbzK0' }}
                    defaultCenter={destination}
                    defaultZoom={destination.zoom_level}
                >
                {
                    diveSites.map(site => <Flag 
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
            
            {activeSite != null ?
            <section className="section">
                <div className="container is-fluid">
                    <div className="columns">
                        <div className="column is-three-quarters"></div>
                        <div className="column">
                            <div className="tile box is-vertical" id="main-content">
                               <DestinationCard 
                                    country={props.match.params.country}
                                    city={props.match.params.city}
                                    site={activeSite} 
                                    isLoggedIn={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            :null}
            </div> */}
      </div>
    </>
  );
}

export default Destination;
