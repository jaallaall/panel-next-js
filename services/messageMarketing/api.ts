import { instance } from "../fetchClient";

export const messageSms = async () => {
  const { data } = await instance().get("advertisement/message/sms/user/sms");
  return data;
};
