import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar'
import SimpleMap from './Map'


// async function initMap() {
//     var cozumel = { lat: 20.423250, lng: -86.924084 };
//     var map = new google.maps.Map(
//         document.getElementById('map'), { zoom: 11, center: cozumel });
//         const sites = await loadSites()
//         markers = sites.map((site) => {
//         const position = {
//             lat: Number(site.lat),
//             lng: Number(site.lng)
//         }
//         const icon = '/static/img/diverflag.png'
//         var marker = new google.maps.Marker({
//             title: site.name,
//             position, 
//             map,
//             icon
//         });

//         const infowindow = new google.maps.InfoWindow({
//             content: site.name
//         });

//         infoWindows.push(infowindow)

//         marker.addListener('click', function() {
//             infoWindows.forEach((window) => window.close())

//             infowindow.open(map, marker);
//             showSite(marker.title)
//         });

//         return marker
//     })
// }

function PageContent() {
    const activeSite = {
        name: 'Somereef',
        location: 'Cozumel'
    }
    return (
        <div>
            <SimpleMap />
            <div id="content">
            <section className="section">
                <div className="container is-fluid">
                    <div className="columns">
                        <div className="column is-three-quarters"></div>
                        <div className="column">
                            <div className="tile box is-vertical" id="main-content">
                                <div v-if="activeSite != null">
                                    <h2 className="title is-two">{activeSite.name}</h2>
                                    <h3 className="subtitle is-four">{activeSite.location}</h3>
                                    <div v-if="user != null">
                                        <textarea className="textarea" placeholder="Take notes here."></textarea>
                                        <button >submit</button>
                                    </div>
                                    <div>
                                        <textarea className="textarea" placeholder="Please login to take notes" disabled></textarea>
                                    </div>

                                </div>
                                <div>
                                    <h2 className="title is-two">No Dive Site Selected!</h2>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        </div>
    );
}

export default PageContent;
