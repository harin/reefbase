import React from 'react';

interface Props {
    diveLogs: any[]
}

const DiveLogsList = ({ diveLogs }: Props) => {

    return <ul>
        {diveLogs.map((diveLog: any) => 
            <li key={diveLog.id}>
                <pre>{JSON.stringify(diveLog, null ,2)}</pre>
            </li>
        )}
        </ul>
}

export default DiveLogsList