import { useMutation, useQuery } from "react-query";
import { userAll, userCreate, userDelete, userUpdate } from "./api";

export const useUserAll = () => {
  return useQuery(["userAll"], () => userAll(), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};

export const useUserCreate = () => useMutation(userCreate);

export const useUserUpdate = () => useMutation(userUpdate);
export const useUserDelete = () => useMutation(userDelete);
