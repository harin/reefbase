import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import { getDestinations, IDestination } from './api'
// const Tile = (props) => <div className="tile is-child">{props.children}</div>

const Dest = ({dest} : {dest:any}) => (
    <Link className="box" 
        to={`/destinations/${dest.country}/${dest.name}`} 
        style={{margin: 10, height: 250, width: 250, background: '#102D54'}}
    > 
        <div className="title is-4"
        style={{color:'white', height: '100%', verticalAlign:'center'}}>
            {dest.name}
        </div>
    </Link>
)
const Level = (props:any) => <div className="level">{props.children}</div>

function Destinations() {
    
    const [isLoading, setIsLoading] = useState(true)
    const [destinations, setDestinations] = useState<IDestination[]>([])
    useEffect(() => {
        (async function() {
            try {
                const destinations = await getDestinations()
                setDestinations(destinations)
                setIsLoading(false)
            } catch(error) {
                alert(error)
            }
        })()
    }, [])

    return (
        <div className="section">
        <div className="container">
             <Level>
                 <h1 className='title is-3' style={{paddingLeft: 23}}>Destinations</h1>
             </Level>
             <Level>
                 { isLoading ? 
                <div className="box is-loading" style={{background: '#102D54'}}>
                    Loading
                </div>
                 : null}
                <div className="tile is-parent">
                    { destinations.map(dest => <Dest dest={dest} key={dest.id}/>)}
                </div>
             </Level>
        </div></div>
    );
}

export default Destinations;
