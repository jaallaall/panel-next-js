import { Options } from "interfaces";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { userAll, userCreate } from "./api";

export const useUserAll = (): UseQueryResult<any, unknown> => {
  return useQuery<any, unknown, any, (string | number)[]>(
    ["userAll"],
    () => userAll(),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
};

export const useUserCreate = (): UseMutationResult<Options, Error, Options> =>
  useMutation<Options, Error, Options>(userCreate);
