import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { getCountries, getCities, ICity, loadJson } from './api'


const Level = (props: any) => <div className="level">{props.children}</div>

function DestinationList(props: { locationType: string, country?: string }) {
    const { locationType, country } = props
    const [isLoading, setIsLoading] = useState(true)
    const [destinations, setDestinations] = useState<ICity[]>([])
    const [next, setNext] = useState(null as string | null)

    let breadcrumb = [{ name: 'Countries', href: '/destinations' }]
    if (country != null) {
        breadcrumb.push({
            name: country,
            href: `/destinations/${country}`
        })
    }

    useEffect(() => {
        (async function () {
            try {
                let data = null
                if (locationType === 'countries') {

                    data = await getCountries()
                } else {
                    data = await getCities({ country_name: String(props.country), limit: '10' })
                }
                setNext(data.next)
                setDestinations(data.results)
                setIsLoading(false)
            } catch (error) {
                alert(error)
            }
        })()
    }, [locationType, props.country])

    return (
        <DestinationList_ 
            breadcrumb={breadcrumb}
            isLoading={isLoading} 
            destinations={destinations} 
            locationType={locationType}
            hasMore={next != null}
            loadMoreHandler={async () => {
                if (next == null) return
                const urlObj = new URL(next)
                // fix different host in development
                const url = urlObj.href.replace(urlObj.origin, '')

                const data = await loadJson(url)
                data.results = data.results.map((datum: ICity) => {
                    datum.country_name = country
                    return datum
                })

                const newList = destinations.concat(data.results)
                setDestinations(newList)
                setNext(data.next)
            }}
        />
    );
}
// TODO: better abstraction of list

const Countries = ({ dest }: { dest: any }) => (
    <Link className="box"
        to={`/destinations/${dest.name}`}
        style={{ margin: 10, height: 250, width: 250, background: '#102D54' }}
    >
        <div className="title is-4"
            style={{ color: 'white', height: '100%', verticalAlign: 'center' }}>
            {dest.name} <span className="tag is-dark">{dest.num_divesite} divesites</span>
        </div>
    </Link>
)

const Cities = ({ dest }: { dest: any }) => (
    <Link className="box"
        to={`/destinations/${dest.country_name}/${dest.name}`}
        style={{ margin: 10, height: 250, width: 250, background: '#102D54' }}
    >
        <div className="title is-4"
            style={{ color: 'white', height: '100%', verticalAlign: 'center' }}>
            {dest.name} <span className="tag is-dark">{dest.num_divesite} divesites</span>

        </div>
    </Link>
)

const Dest = ({ dest, locationType }: { dest: any, locationType: string }) => {
    if (locationType === 'countries') return <Countries dest={dest} />
    return <Cities dest={dest} />
}

interface IBreadcrumb {
    href: string;
    name: string;
}

export const DestinationList_ = ({ breadcrumb, isLoading, destinations, locationType, hasMore, loadMoreHandler } : 
    {
        breadcrumb: IBreadcrumb[],
        isLoading: boolean, 
        destinations: ICity[], 
        locationType: string,
        hasMore: boolean,
        loadMoreHandler: Function 
    }) => (
    <div className="section">
        <div className="container">
            <Level>
                <nav className="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                    {
                        breadcrumb.map((crumb, idx) =>
                            <li key={idx} className={idx === (breadcrumb.length - 1) ? 'is-active': ''}>
                                <Link to={crumb.href} className='title is-3' style={{ padding: '10px'}}>{ crumb.name }</Link>
                            </li>
                        )
                    }
                    </ul>
                </nav>
            </Level>
            <Level>
                <div className="tile is-parent" style={{ flexWrap: 'wrap' }}>
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
                    { hasMore ?
                    <button className="box"
                            style={{ margin: 10, height: 250, width: 250, background: '#487fca', cursor: 'pointer' }}
                            onClick={() =>  loadMoreHandler()}
                        >
                            <div className="title is-4" style={{ color: 'white' }}>More</div>
                        </button>
                    : null
                    }
 
                </div>
            </Level>
        </div>
    </div>
)



export default DestinationList;
