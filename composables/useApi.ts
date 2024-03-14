import axios from "axios";
import { IAPIOption } from "~~/types/api";
export const useApi = async <T>(endpoint: string, options: IAPIOption) => {
  const baseUrl = "https://tech-cambodia.com/cms";
  const response = await axios<T>(baseUrl + endpoint, options);
  return response.data;
};


