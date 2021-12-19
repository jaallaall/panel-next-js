import { useQuery, UseQueryResult } from "react-query";
import { messageSms } from "./api";

export const useMessageSms = (): UseQueryResult<any, unknown> => {
  return useQuery<any, unknown, any, (string | number)[]>(
    ["messageSms"],
    () => messageSms(),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
};
