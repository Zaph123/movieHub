import axios, {AxiosRequestConfig, AxiosResponse} from "axios"
import { useEffect, useState, useMemo } from "react";

interface UseAxiosResponse<T> {
  data: ApiResponse<T>[] | null;
  error: string | null;
  isLoading: boolean;
}

export interface ApiResponse<T> {
  page: number,
  results: T[] | null,
  total_pages: number,
  total_results: number
}

export interface Results {
    id: number,
    original_title: string,
    name: string,
    overview: string,
    media_type: string,
    poster_path: string,
    title: string,
    vote_count: number,
    vote_average: number,
    adult: boolean,
    release_date: string,
    original_language: string,
    site: string,
    key: string
}

export function useAxios<T = unknown>(
  urls: string[],
  config?: AxiosRequestConfig
): UseAxiosResponse<T> {
  const [data, setData] = useState<ApiResponse<T>[] | null>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const memoizedUrls = useMemo(() => urls, [urls.join()]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const responses: AxiosResponse<ApiResponse<T>>[] = await Promise.all(memoizedUrls.map(url => axios.get<ApiResponse<T>>(url, config)));
        const responseData: ApiResponse<T>[] = responses.map(res => res.data)
        setData(responseData);
        setIsLoading(false)
        // if(responseData[0]?.results?.length === 0){
        //   setError("No Result found with the name")
        //   console.log("not found");
        //   return
        // }
       
      } catch (err: any) {
        setError("Please check your Internet Connection and try again")
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [memoizedUrls, config]);

  return { data, error, isLoading };
}
  

export default useAxios
