import React, { useState, useEffect } from 'react';
import DiveLogForm from './components/DiveLogForm'
import DiveLogsList from './components/DiveLogsList'
import CardRight from './components/CardRight'
import DiveMap from './components/DiveMap'
import { meanBy } from 'lodash-es'

import { getDiveSites, getDiveLogs} from './lib/api'

export const DiveLogsPage = () => {
    const [diveLogs, setDiveLogs ] = useState([] as any[])
    const [isLoading, setIsLoading] = useState(false)
    const [isCreate, setIsCreate] = useState(false)

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const result = await getDiveLogs()
            setIsLoading(false)
            setDiveLogs(result.results)
        })()
    }, [])

    let lat = 0
    let lng = 0
    if (diveLogs.length > 0) {
      lat = meanBy(diveLogs, (d) => d.divesite.lat)
      lng = meanBy(diveLogs, (d) => d.divesite.lng)
    }

    return (
      <>
        <DiveMap
          locations={diveLogs.map(d => d.divesite)}
          defaultZoom={8}
          centerCoord={{ lat, lng }}
          autoZoom={true}
        >
          <CardRight>
            {isCreate ? (

              <DiveLogForm
                getDiveSites={getDiveSites}
                onSubmitted={() => window.location.reload()}
                onCanceled={() => setIsCreate(false)}
              />
            ) : (
              <>
              <button
              className="button"
              onClick={() => {
                setIsCreate(!isCreate);
              }}
            >
              + New Log
            </button>
              <DiveLogsList diveLogs={diveLogs} />
              </>

            )}
          </CardRight>
        </DiveMap>
      </>
    );
}



export default DiveLogsPage
