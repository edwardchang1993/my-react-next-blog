import { gql } from "@apollo/client";

export const GET_SPACEX_LAUNCHES = gql`
  query GetLaunches {
    launchesPast {
      mission_name
      launch_date_local
      details
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
        rocket_type
      }
    }
  }
`;
