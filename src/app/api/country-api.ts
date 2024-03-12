import { api } from '@/utils/api-utils';
import { CountryListData } from './country-types';


// Define your specific API endpoints
export async function getCountryListApi(): Promise<CountryListData> {
  let endpoint = `setup/country/`;
  return api(endpoint);
}
