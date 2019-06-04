import React, { useState, useEffect } from 'react';
import DiveLogForm from './components/DiveLogForm'
import DiveLogsList from './components/DiveLogsList'
import CardRight from './components/CardRight'
import DiveMap from './components/DiveMap'

import { getDiveSites, getDiveLogs} from './api'

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

    return (
      <>
        <DiveMap
          locations={[]}
          defaultZoom={8}
          centerCoord={{ lat: 0, lng: 0 }}
        />
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
      </>
    );
}



export default DiveLogsPage
