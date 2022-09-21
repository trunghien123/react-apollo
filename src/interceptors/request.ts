import { AxiosRequestConfig } from 'axios';
import Axios from 'src/utils/axios';
import { get } from 'src/utils/cookie';

Axios.interceptors.request.use((config: AxiosRequestConfig) => {
    console.log(config);
    
  const token = get('react_apollo_token');
  if (token && !config.headers!.RefreshToken) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
});
