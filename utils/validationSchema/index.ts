import * as yup from "yup";

// const phoneRegExp =
//   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const phoneRegExp = /^(\+98|0)?9\d{9}$/g;

const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export const validationSchemaLogin = yup.object({
  username: yup.string().required("This field is required"),
  password: yup.string().required("This field is required"),
});

export const validationSchema = yup.object({
  username: yup.string().required("This field is required"),
  password: yup.string().required("This field is required"),
  email: yup
    .string()
    .email("Enter the email correctly")
    .required("This field is required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Invalid phone number")
    .required("This field is required"),
});
