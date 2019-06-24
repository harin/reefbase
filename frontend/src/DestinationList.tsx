import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCountries, getCities, ICity, loadJson } from "./lib/api";
import DiveMap from "./components/DiveMap";

const Level = (props: any) => <div className="level">{props.children}</div>;

function DestinationList(props: {
  locationType: string;
  country?: string;
  history: any;
}) {
  const { locationType, country, history } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [destinations, setDestinations] = useState<ICity[]>([]);
  const [next, setNext] = useState(null as string | null);

  let breadcrumb = [{ name: "Countries", href: "/destinations" }];
  if (country != null) {
    breadcrumb.push({
      name: country,
      href: `/destinations/${country}`
    });
  }

  useEffect(() => {
    (async function() {
      try {
        let data = null;
        if (locationType === "countries") {
          data = await getCountries();
        } else {
          data = await getCities({
            country_name: String(props.country),
            page_size: "200"
          });
        }
        setNext(data.next);
        setDestinations(data.results);
        setIsLoading(false);
      } catch (error) {
        alert(error);
      }
    })();
  }, [locationType, props.country]);

  return (
    <DestinationList_
      history={history}
      breadcrumb={breadcrumb}
      isLoading={isLoading}
      destinations={destinations}
      locationType={locationType}
      hasMore={next != null}
      loadMoreHandler={async () => {
        if (next == null) return;
        const urlObj = new URL(next);
        // fix different host in development
        const url = urlObj.href.replace(urlObj.origin, "");

        const data = await loadJson(url);
        data.results = data.results.map((datum: ICity) => {
          datum.country_name = country;
          return datum;
        });

        const newList = destinations.concat(data.results);
        setDestinations(newList);
        setNext(data.next);
      }}
    />
  );
}



interface IBreadcrumb {
  href: string;
  name: string;
}

export const DestinationList_ = ({
  breadcrumb,
  isLoading,
  destinations,
  locationType,
  hasMore,
  loadMoreHandler,
  history
}: {
  breadcrumb: IBreadcrumb[];
  isLoading: boolean;
  destinations: ICity[];
  locationType: string;
  hasMore: boolean;
  loadMoreHandler: Function;
  history: any
}) => {
  return (
    <div>
      {destinations.length > 0 && (
        <DiveMap
          locations={destinations}
          activeSite={undefined}
          activeSiteCountry={""}
          activeSiteCity={""}
          setActiveLocation={(location: any) => {
              if (locationType == 'countries') {
                  history.push(`/destinations/${location.name}`)
              } else {
                  history.push(`/destinations/${location.country_name}/${location.name}`)
              }
          }}
          autoZoom={true}
          defaultZoom={8}
        />
      )}
    </div>
  );
};

export default DestinationList;
