import React from 'react';
import diveflag from '../diverflag.png'
import { IDiveSite } from '../lib/api'

function calculateMarkerSize(zoom: any) {
    // return 10
    if (zoom == null) return 5;
    // console.log(5*zoom/9)
    let size = 10 * zoom/10 + 1;
    if (size > 20) size = 20
    return size
}

interface DiveFlagProps {
  site: IDiveSite;
  lat: number;
  lng: number;
  zoom?: any;
  clickHandler?: (site: IDiveSite) => void;
  color?: string;
  diameter?: number;
  text?: string;
}
const DiveFlag = ({
  site,
  zoom,
  color,
  diameter,
  text,
  clickHandler = () => {}
}: DiveFlagProps) => {
  if (color == null) {
    color = 'red'
  }

  if (diameter == null) {
    diameter = calculateMarkerSize(zoom)
  }

  return (
    <div className="tooltip" data-tooltip={site.name}
      style={{
        height: diameter,
        width: diameter,
        backgroundColor: color,
        borderRadius: "50%",
        display: "flex",
        flexDirection: 'column',
        alignContent: 'center',
        cursor: 'pointer',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        border: '1px solid white'
      }}
      onClick={() => clickHandler(site)}
    >
      <span
        style={{
          color: 'white', 
          textAlign: 'center',
          width: '100%',
          flexGrow: 1
        }}
      >{text}</span>
    </div>
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