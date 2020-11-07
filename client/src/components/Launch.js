import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import classNames from "classnames";

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_date_local
      launch_success
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

const Launch = ({ match }) => {
  let { flight_number } = match.params;
  // Need to convert str to int
  flight_number = parseInt(flight_number);

  const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number },
  });

  if (loading) return <h4>Loading...</h4>;

  const {
    mission_name,
    launch_year,
    launch_success,
    rocket: { rocket_id, rocket_name, rocket_type },
  } = data.launch;

  return (
    <>
      <div>
        <h1 className="my-3">
          <span className="text-light">Mission:</span> {mission_name}
        </h1>
        <h4 className="mb-3">Launch Details</h4>
        <ul className="list-group">
          <li className="list-group-item">Flight Number: {flight_number}</li>
          <li className="list-group-item">Launch Year: {launch_year}</li>
          <li className="list-group-item">
            Launch Successful:{" "}
            <span className={launch_success ? "text-success" : "text-danger"}>
              {launch_success ? "Yes" : "No"}
            </span>
          </li>
        </ul>
        <h4 className="my-3">Rocket Details</h4>
        <ul className="list-group">
          <li className="list-group-item">Rocket ID: {rocket_id}</li>
          <li className="list-group-item">Rocket Name: {rocket_name}</li>
          <li className="list-group-item">Rocket Type: {rocket_type}</li>
        </ul>
        <hr />
        <Link to="/" className="btn btn-secondary">
          Back
        </Link>
      </div>
    </>
  );
};

export default Launch;
