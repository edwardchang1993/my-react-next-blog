export interface LauncheType {
  mission_name: string;
  launch_date_local: string;
  details?: string | null;
  launch_site: {
    site_name_long: string;
  };
  rocket: {
    rocket_name: string;
    rocket_type: string;
  };
}
