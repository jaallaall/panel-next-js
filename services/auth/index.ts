import { useMutation } from "react-query";
import { loginAdmin, loginUser, logout, register } from "./api";

export const useRegister = () => useMutation(register);

export const useLoginUser = () => useMutation(loginUser);

export const useAdminUser = () => useMutation(loginAdmin);

export const useLogout = () => useMutation(logout);
