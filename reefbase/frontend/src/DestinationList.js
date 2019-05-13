import React from 'react';
import './App.css';
import { Link } from 'react-router-dom'
// const Tile = (props) => <div className="tile is-child">{props.children}</div>

const Dest = ({dest}) => (
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
const Level = (props) => <div className="level">{props.children}</div>

function Destinations() {
    const dest = [
        { id:1, name: 'Cozumel', country: 'Mexico' },
        { id:2, name: 'Koh Tao', country: 'Thailand' },
        { id:3, name: 'Rajah Ampat', country: 'Indonesia' }
    ]

    return (
        <div className="section">
        <div className="container">
             <Level>
                 <h1 className='title is-3' style={{paddingLeft: 23}}>Destinations</h1>
             </Level>
             <Level>
                <div className="tile is-parent">
                    { dest.map(dest => <Dest dest={dest} />)}
                </div>
             </Level>
        </div></div>
    );
}

export default Destinations;
