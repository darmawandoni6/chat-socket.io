import { env } from '@config/environment';
import axios from 'axios';
import Swal from 'sweetalert2';

const sourceRequest = {};

const httpService = axios.create({
  baseURL: env.BASE_URL,
  withCredentials: true,
});

httpService.interceptors.request.use(
  (request) => {
    if (sourceRequest[request.url]) {
      sourceRequest[request.url].cancel('Automatic cancellation');
    }

    // Store or update application token
    const axiosSource = axios.CancelToken.source();
    sourceRequest[request.url] = { cancel: axiosSource.cancel };
    request.cancelToken = axiosSource.token;

    return request;
  },
  (error) => Promise.reject(error),
);

httpService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { data, status } = error.response;
      if (data) {
        Swal.fire(status.toString(), data.message, 'error').then(() => {
          if (status === 401) {
            window.location.href = '/';
          }
        });
      }
    } else if (error.code !== 'ERR_CANCELED') {
      Swal.fire('Error', error.message, 'error').then(() => {
        if (error.code === 'ERR_NETWORK') window.location.href = '/';
      });
    }
    return Promise.reject(error);
  },
);

export default httpService;
