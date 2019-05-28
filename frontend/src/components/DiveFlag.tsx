import React from 'react';
import diveflag from '../diverflag.png'
import { IDiveSite } from '../api'


const DiveFlag = ({ site, lat, lng, clickHandler = () => { } }: { site: IDiveSite, lat: number, lng: number, clickHandler?: (site: IDiveSite) => void }) => {

    return (
        <img
            className="tooltip"
            onClick={() => clickHandler(site)}
            src={diveflag}
            alt='Diver Down Flag'
            data-tooltip={site.name}
            style={{
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                cursor: 'pointer'
            }}
        />
    )
}

export default DiveFlag