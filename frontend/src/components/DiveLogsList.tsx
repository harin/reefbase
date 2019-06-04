import React from 'react';

interface Props {
    diveLogs: any[]
}

const DiveLogsList = ({ diveLogs }: Props) => {

    return (
      <ul>
        {diveLogs.map((diveLog: any) => (
          <li key={diveLog.id} className="card">
            <div className="card-header-title">
              <div className="columns" style={{flexGrow:'inherit'}}>
                <div className="column is-two-thirds">
                  <div className="title is-size-6">
                    {diveLog.divesite.name}
                  </div>
                  <div className="subtitle is-size-7">
                    {diveLog.divesite.city.name},{" "}
                    {diveLog.divesite.city.country.name}
                  </div>
                </div>
                <div className="column is-one-thirds is-size-7 has-text-right">
                    <div>{diveLog.date}</div>
                </div>
              </div>
            </div>
            {/* <pre>{JSON.stringify(diveLog, null ,2)} */}

            {/* </pre> */}
          </li>
        ))}
      </ul>
    );
}

export default DiveLogsList