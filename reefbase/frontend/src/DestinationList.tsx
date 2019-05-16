import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { getDestinations, IDestination } from './api'


const Level = (props: any) => <div className="level">{props.children}</div>

function DestinationList() {

    const [isLoading, setIsLoading] = useState(true)
    const [destinations, setDestinations] = useState<IDestination[]>([])
    useEffect(() => {
        (async function () {
            try {
                const destinations = await getDestinations()
                setDestinations(destinations)
                setIsLoading(false)
            } catch (error) {
                alert(error)
            }
        })()
    }, [])

    return (
        <DestinationList_ isLoading={isLoading} destinations={destinations} />
    );
}

const Dest = ({ dest }: { dest: any }) => (
    <Link className="box"
        to={`/destinations/${dest.country}/${dest.name}`}
        style={{ margin: 10, height: 250, width: 250, background: '#102D54' }}
    >
        <div className="title is-4"
            style={{ color: 'white', height: '100%', verticalAlign: 'center' }}>
            {dest.name}
        </div>
    </Link>
)




export const DestinationList_ = ({ isLoading, destinations} : {isLoading: boolean, destinations: IDestination[]}) => (
    <div className="section">
        <div className="container">
            <Level>
                <h1 className='title is-3' style={{ paddingLeft: 23 }}>Destinations</h1>
            </Level>
            <Level>
                <div className="tile is-parent">
                    { isLoading ?
                    Array(10).fill(null).map((_) =>
                    <div className="box is-loading"
                        style={{ margin: 10, height: 250, width: 250, background: '#102D54' }}
                    >
                        <div className="title is-4"
                            style={{ color: 'white', height: '100%', verticalAlign: 'center' }}>
                        </div>
                    </div>
                )
                        :
                        destinations.map(dest => <Dest dest={dest} key={dest.id} />)
                    }
                </div>
            </Level>
        </div>
    </div>
)



export default DestinationList;
