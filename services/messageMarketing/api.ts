import { Options } from "interfaces";
import { instance } from "../fetchClient";

export const userAll = async () => {
  const { data } = await instance().get("advertisement/message/sms/user/sms");
  return data;
};

export const userCreate = async (body: Options) => {
  const { data } = await instance().post("advertisement/message/sms/user/sms", {
    message: body.message,
    query_param: {
      gender: body.gender,
      city: body.city,
    },
    number: body.number,
  });
  return data;
};
