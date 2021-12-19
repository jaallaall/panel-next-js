import { Options } from "interfaces";
import { instance } from "../fetchClient";

export const register = async (body: Options) => {
  const { data } = await instance().post("auth/register/user/", {
    username: body.email,
    password: body.password,
    email: body.email,
    phone_number: body.phoneNumber,
  });
  return data;
};

export const loginUser = async (body: Options) => {
  const { data } = await instance().post("auth/login/username/user/", {
    username: body.username,
    password: body.password,
  });
  return data;
};

export const loginAdmin = async (body: Options) => {
  const { data } = await instance().post("auth/login/username/admin/", {
    username: body.username,
    password: body.password,
  });
  return data;
};

export const logout = async () => {
  const { data } = await instance().post("auth/logout/user/");
  return data;
};
