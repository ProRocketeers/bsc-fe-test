import { IUseFetch } from './useFetch';
import { IFetchRequestConfig } from './bscApi';

const defaultHeaders = {
  'Content-Type': 'application/json',
};
export interface IFetchHelperOptions<TData, TDefaultData> {
  setState: (args: IUseFetch<TData, any>) => void;
  state: IUseFetch<TData, TDefaultData>;
  config: IFetchRequestConfig;
}
export const fetchHelper = async <TData, TDefaultData>({
  setState,
  state,
  config,
}: IFetchHelperOptions<TData, TDefaultData>) => {
  setState({ ...state, loading: true });
  try {
    const response = await fetchRequest(config);

    if (response.ok) {
      const data = await response.json();
      setState({ loading: false, error: null, data });
    } else {
      setState({
        loading: false,
        error: new Error(response.statusText),
        data: null,
      });
    }
  } catch (error) {
    setState({
      loading: false,
      error,
      data: null,
    });
  }
};

export const fetchRequest = ({
  url,
  body = null,
  method = 'GET',
}: IFetchRequestConfig): Promise<Response> => {
  let fetchConfig: RequestInit = {
    method,
    headers: defaultHeaders,
  };

  if (body) {
    fetchConfig = { ...fetchConfig, body: JSON.stringify(body) };
  }
  return fetch(url, fetchConfig);
};
