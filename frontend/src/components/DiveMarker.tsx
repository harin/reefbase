import React from 'react';
import diveflag from '../diverflag.png'
import { IDiveSite } from '../api'

function calculateMarkerSize(zoom: any) {
    // return 10
    if (zoom == null) return 5;
    // console.log(5*zoom/9)
    let size = 10 * zoom/10 + 1;
    if (size > 20) size = 20
    return size
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
        cursor: 'pointer',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        border: '1px solid white'
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