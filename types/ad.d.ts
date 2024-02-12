import { IAd_Types } from "./ad_types";

export interface IAd {
    link: string;
    slug: string;
    file: string;
    mobile_only: boolean;
    advertisement_type: IAd_Types;
}