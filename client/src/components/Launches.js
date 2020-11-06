import React from "react";
import { useQuery, gql } from "@apollo/client";
import LaunchItem from "./LaunchItem";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

// function ExchangeRates() {
//   const { loading, error, data } = useQuery(EXCHANGE_RATES);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;

//   return data.rates.map(({ currency, rate }) => (
//     <div key={currency}>
//       <p>
//         {currency}: {rate}
//       </p>
//     </div>
//   ));
// }

const Launches = () => {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);

  return (
    <>
      <h1 className="display-4 my-3">Launches</h1>
      {loading && <h4>Loading...</h4>}
      {data && (
        <>
          {data.launches.map((launch) => (
            <LaunchItem key={launch.flight_number} launch={launch} />
          ))}
        </>
      )}
    </>
  );
};

export default Launches;
