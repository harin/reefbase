import React, { useState } from "react";
import { IDiveSite, APIResults } from '../lib/api'

const SEARCH_TIMEOUT_MS = 500

const DiveSiteSelect = ({
  handleChange,
  getDiveSites,
  name
}: {
  name: string;
  handleChange: (e: React.ChangeEvent<any>) => void;
  getDiveSites: (query?: any) => Promise<APIResults<IDiveSite>>;
}) => {

  const [diveSites, setDiveSites] = useState([] as IDiveSite[])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTimeout, setSearchTimeout] = useState()

  return (
    <div className="control has-icons left">
        <input type="text" 
            onChange={(e) => {
              const value = e.target.value
              clearTimeout(searchTimeout)
              const newTimeout = setTimeout(async () => {
                if (isLoading) return
                setIsLoading(true)
                const result = await getDiveSites({
                    keyword: value
                })
                setIsLoading(false)
                setDiveSites(result.results)
              }, SEARCH_TIMEOUT_MS)
              setSearchTimeout(newTimeout)
            }}
            placeholder='Search Dive Site by Name'
        />
      <div className="select">
        <select
          name={name}
          onChange={handleChange}
        >
          {diveSites.map((d: any) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>
      <span className="icon is-left">
        <i className="fas fa-globe" />
      </span> 
    </div>
  );
};

export default DiveSiteSelect;
