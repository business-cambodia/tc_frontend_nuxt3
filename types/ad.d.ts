import { IAd_Types } from "./ad_types";

export interface IAd {
    name: string;
  slug: string;
  id: number;
  file: string;
  link: string;
  mobile_only: boolean;
  file_mobile: string;
  advertisement_type: {
    type: string;
  };
  advertiser: {
    slug: string;
  };
  detail_page: boolean;
}