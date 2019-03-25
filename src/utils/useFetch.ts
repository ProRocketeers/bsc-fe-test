import { useEffect } from 'react';
import { fetchHelper, IFetchHelperOptions } from './fetchHelper';

export interface IUseFetch<TData, TDefaultData = null> {
  error: Error | null;
  data: TData | TDefaultData;
  loading: boolean;
}
export const defaultFetchResponse: IUseFetch<any, null> = {
  error: null,
  data: null,
  loading: false,
};

export const useFetch = <TData, TDefaultData = null>(
  options: IFetchHelperOptions<TData, TDefaultData>
): void => {
  const { url } = options.config;

  useEffect(() => {
    fetchHelper<TData, TDefaultData>(options);
  }, [url]);
};
