import { useQuery, useSubscription } from "@apollo/client";
import { GET_SPACEX_LAUNCHES } from "@/graphql/spaceX/queries/launches";
import { NEW_SPACEX_LAUNCH_SUBSCRIPTION } from "@/graphql/spaceX/subscriptions/newLaunch";
import type { LauncheType } from "./types";

export const useSpaceX = () => {
  const { data, loading, error } = useQuery(GET_SPACEX_LAUNCHES);

  const launches = data?.launchesPast
    ?.map((item: LauncheType, index: number) => {
      return {
        id: index,
        mission_name: item.mission_name,
        rocket: {
          rocket_name: item.rocket.rocket_name,
          rocket_type: item.rocket.rocket_type,
        },
        launch_date_local: new Date(item.launch_date_local).toLocaleDateString(
          "en-TW",
          {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }
        ),
      };
    })
    .sort(
      (a: LauncheType, b: LauncheType) =>
        new Date(b.launch_date_local).getTime() -
        new Date(a.launch_date_local).getTime()
    );

  useSubscription(NEW_SPACEX_LAUNCH_SUBSCRIPTION, {
    onData: ({ data }) => {
      console.log("New launch:", data);
    },
  });

  return { launches: launches || [], loading, error };
};
