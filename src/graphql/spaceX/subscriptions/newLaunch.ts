import { gql } from "@apollo/client";

export const NEW_SPACEX_LAUNCH_SUBSCRIPTION = gql`
  subscription NewLaunch {
    launchUpcoming {
      mission_name
      launch_date_local
    }
  }
`;
