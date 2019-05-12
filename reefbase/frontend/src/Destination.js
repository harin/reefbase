import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar'
import SimpleMap from './Map'
import GoogleMapReact from 'google-map-react';
import diveflag from './diverflag.png'
import DestinationCard from './DestinationCard';

const Flag = ()=> {

    function onClick() {
        alert('hello')
    }

    return (
        <img onClick={onClick} src={diveflag} style={{
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            cursor: 'pointer'
        }}/>
    )
}

function Destination(props) {
    const { sites } = props
    const site = sites[0]
    return (
        <div>
           <div style={{ height: '100vh', width: '100%', position: 'fixed', top: 0 }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCaxeoUHkl2GK3sKFaNvLfoRWMTm0EbzK0' }}
                    defaultCenter={[site.lat, site.lng]}
                    defaultZoom={11}
                >
                {
                    sites.map(site => <Flag lat={site.lat} lng={site.lng} />)
                }
                </GoogleMapReact>
            </div>
            <div id="content">

            <section className="section">
                <div className="container is-fluid">
                    <div className="columns">
                        <div className="column is-three-quarters"></div>
                        <div className="column">
                            <div className="tile box is-vertical" id="main-content">
                               <DestinationCard />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        </div>
    );
}

export default Destination;
