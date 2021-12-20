import { Options } from "interfaces";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { messageSms, userCreate } from "./api";

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

export const useUserCreate = (): UseMutationResult<Options, Error, Options> =>
  useMutation<Options, Error, Options>(userCreate);
