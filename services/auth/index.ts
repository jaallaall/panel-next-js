import { Options } from "interfaces";
import { useMutation, UseMutationResult } from "react-query";
import { loginAdmin, loginUser, logout, register } from "./api";

export const useRegister = (): UseMutationResult<Options, Error, Options> =>
  useMutation<Options, Error, Options>(register);

export const useLoginUser = (): UseMutationResult<Options, Error, Options> =>
  useMutation<Options, Error, Options>(loginUser);

export const useAdminUser = (): UseMutationResult<Options, Error, Options> =>
  useMutation<Options, Error, Options>(loginAdmin);

export const useLogout = (): UseMutationResult<Options, Error, Options> =>
  useMutation<Options, Error, Options>(logout);
