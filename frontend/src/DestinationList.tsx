import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { getCountries, getCities, IDestination } from './api'


const Level = (props: any) => <div className="level">{props.children}</div>

function DestinationList(props: { locationType: string, country?: string }) {
    const { locationType } = props
    const [isLoading, setIsLoading] = useState(true)
    const [destinations, setDestinations] = useState<IDestination[]>([])
    useEffect(() => {
        (async function () {
            try {
                let data = null
                if (locationType === 'countries') 
                    data = await getCountries()
                else 
                    data = await getCities({ country: String(props.country), limit: '10' })
                setDestinations(data.results)
                setIsLoading(false)
            } catch (error) {
                alert(error)
            }
        })()
    }, [])

    return (
        <DestinationList_ 
            isLoading={isLoading} 
            destinations={destinations} 
            locationType={locationType} />
    );
}

const Countries = ({ dest }: { dest: any }) => (
    <Link className="box"
        to={`/destinations/${dest.name}`}
        style={{ margin: 10, height: 250, width: 250, background: '#102D54' }}
    >
        <div className="title is-4"
            style={{ color: 'white', height: '100%', verticalAlign: 'center' }}>
            {dest.name}
        </div>
    </Link>
)

const Cities = ({ dest }: { dest: any }) => (
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

const Dest = ({ dest, locationType }: { dest: any, locationType: string }) => {
    if (locationType === 'countries') return <Countries dest={dest} />
    return <Cities dest={dest} />
}

export const DestinationList_ = ({ isLoading, destinations, locationType } : {isLoading: boolean, destinations: IDestination[], locationType: string}) => (
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
                        destinations.map(dest => <Dest dest={dest} key={dest.id} locationType={locationType}/>)
                    }
                </div>
            </Level>
        </div>
    </div>
)



export default DestinationList;
