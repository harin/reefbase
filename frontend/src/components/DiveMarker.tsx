import React from 'react';
import diveflag from '../diverflag.png'
import { IDiveSite } from '../api'

function calculateMarkerSize(zoom: any) {
    return 10
    if (zoom == null) return 5;
    // console.log(5*zoom/9)
    return 15 * zoom/9 + (20/9);
}

const DiveFlag = ({
  site,
  lat,
  lng,
  zoom,
  clickHandler = () => {}
}: {
  site: IDiveSite;
  lat: number;
  lng: number;
  zoom?: any;
  clickHandler?: (site: IDiveSite) => void;
}) => {
  return (
    <div className="tooltip" data-tooltip={site.name}
      style={{
        height: calculateMarkerSize(zoom),
        width: calculateMarkerSize(zoom),
        backgroundColor: "red",
        borderRadius: "50%",
        display: "inline-block",
        cursor: 'pointer'
      }}
      onClick={() => clickHandler(site)}
    />
  );
  return (
    <div className="tooltip" data-tooltip={site.name}>
      <img
        onClick={() => clickHandler(site)}
        src={diveflag}
        alt="Diver Down Flag"
        style={{
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          cursor: "pointer"
        }}
      />
    </div>
  );
};

export default DiveFlag