import axios from "axios";
import { IAuthService } from "../../../modules/staff/model/infra/dataFetching/apis/AuthServices";

export abstract class APIService {
  protected axiosInstance: any;
  private authService: IAuthService;
  constructor({
    authService,
    baseURL,
    apiPort,
    apiVerson,
  }: {
    authService: IAuthService;
    baseURL: string;
    apiPort: string;
    apiVerson: string;
  }) {
    let enrichBaseURL: string = "";
    enrichBaseURL = apiPort ? `${baseURL}:${apiPort}` : baseURL;
    enrichBaseURL = apiVerson
      ? `${enrichBaseURL}/${apiVerson}`
      : `${enrichBaseURL}`;
    this.authService = authService;
    this.axiosInstance = axios.create({
      baseURL: enrichBaseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.enableInterceptors();
  }
  private enableInterceptors(): void {
    this.axiosInstance.interceptors.response.use(
      this.getSuccessResponseHandler(),
      this.getErrorResponseHandler()
    );
  }
  private getSuccessResponseHandler() {
    return (response: any) => {
      return response;
    };
  }
  private getErrorResponseHandler() {
    return (error: any) => {
      return Promise.reject({ ...error });
    };
  }
  protected get({
    url,
    params,
    headers,
  }: {
    url: string;
    params?: {};
    headers?: {};
  }) {
    const payload = { headers, ...params };
    return this.axiosInstance.get(url, { payload });
  }
  protected post({
    url,
    data,
    params,
    headers,
  }: {
    url: string;
    data: any;
    params?: {};
    headers?: {};
  }) {
    const payload = { headers, data, ...params };
    return this.axiosInstance.post(url, { payload });
  }
  protected put({
    url,
    id,
    data,
    params,
    headers,
  }: {
    url: string;
    id: string;
    data: {};
    params?: {};
    headers?: {};
  }) {
    const payload = { headers, data, ...params };
    return this.axiosInstance.put(`${url}/${id}`, { payload });
  }
  protected delete({
    url,
    id,
    params,
    headers,
  }: {
    url: string;
    id: string;
    params?: {};
    headers?: {};
  }) {
    const payload = { headers, ...params };
    return this.axiosInstance.put(`${url}/${id}`, { payload });
  }
}
