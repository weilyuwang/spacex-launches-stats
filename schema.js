import axios from "axios";
import graphql from "graphql";

// Define the Rocket type
const RocketType = new graphql.GraphQLObjectType({
  name: "Rocket",
  fields: {
    rocket_id: { type: graphql.GraphQLString },
    rocket_name: { type: graphql.GraphQLString },
    rocket_type: { type: graphql.GraphQLString },
  },
});

// Define the Launch type
const LaunchType = new graphql.GraphQLObjectType({
  name: "Launch",
  fields: {
    flight_number: { type: graphql.GraphQLInt },
    mission_name: { type: graphql.GraphQLString },
    launch_year: { type: graphql.GraphQLString },
    launch_date_local: { type: graphql.GraphQLString },
    launch_success: { type: graphql.GraphQLBoolean },
    rocket: { type: RocketType },
  },
});

// Root Query
const RootQuery = new graphql.GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new graphql.GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/launches")
          .then((res) => res.data);
      },
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: graphql.GraphQLInt },
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then((res) => res.data);
      },
    },
    rockets: {
      type: new graphql.GraphQLList(RocketType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/rockets")
          .then((res) => res.data);
      },
    },
    rocket: {
      type: RocketType,
      args: {
        id: { type: graphql.GraphQLInt },
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
          .then((res) => res.data);
      },
    },
  },
});

const schema = new graphql.GraphQLSchema({ query: RootQuery });

export default schema;
