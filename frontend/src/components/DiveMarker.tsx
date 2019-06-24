import React, { ReactChild } from 'react';
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
  children?: ReactChild
}
const DiveFlag = ({
  site,
  zoom,
  color,
  diameter,
  text,
  children,
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
      <span
        style={{
          position: 'relative',
          textShadow: '-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white',
          fontWeight: 500,
          left: diameter + 5
        }}
      >{children}</span>
    </div>
  );
};

export default DiveFlag