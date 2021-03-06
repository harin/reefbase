import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DestinationCard from "./DestinationCard";
import { getDestination, IDiveSite, ICity } from "./lib/api";
import DiveMap from "./components/DiveMap";
import ErrorBoundary from "./components/ErrorBoundary";

function Destination(props: any) {
  const [diveSites, setDiveSites] = useState<IDiveSite[]>([]);
  const [destination, setDestination] = useState<ICity | null>(null);
  const [activeSite, setActiveSite] = useState<any>(null);

  const { country, city } = props.match.params;

  useEffect(() => {
    (async function() {
      const data = await getDestination(country, city);
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
      name: "Country"
    },
    {
      href: `/destinations/${country}`,
      name: country
    },
    {
      href: `/destinations/${country}/${city}`,
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
                style={{ zIndex: 10 }}
                key={idx}
                className={` ${
                  idx === breadcrumb.length - 1 ? "is-active" : ""
                }`}
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
            onClickUpdate={() => {
              const search = props.location.search;
              props.history.push("/destinations/map" + search);
            }}
            locations={diveSites}
            activeSite={activeSite}
            centerCoord={{ lat: destination.lat, lng: destination.lng }}
            activeSiteCountry={""}
            activeSiteCity={""}
            setActiveLocation={(activeSite: any) => {
              console.log("setting active Site");
              setActiveSite(activeSite);
            }}
            autoZoom={true}
            defaultZoom={8}
            onGoogleApiLoaded={({ map, maps }: { map: any; maps: any }) => {
              map.addListener("click", () => {
                setActiveSite(undefined);
              });
            }}
          />
        )}
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
                    <ErrorBoundary>
                      <DestinationCard site={activeSite} />
                    </ErrorBoundary>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default Destination;
