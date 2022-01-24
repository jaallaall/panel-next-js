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

export const validationSchemaUser = yup.object({
  message: yup.string().required("This field is required"),
  gender: yup.string().required("This field is required"),
  city: yup.string().required("This field is required"),
  number: yup.number().required("This field is required"),
});

export const validationSchemaTest = yup.object({
  name: yup.string().required("This field is required"),
  gender: yup.string().required("This field is required"),
  countries: yup
    .object()
    .shape({
      label: yup.string(),
    })
    .nullable()
    .required("This field is required."),
  countries1: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string().required("This field is required."),
      })
    )
    .min(1, "Must have at least one countries1"),
  birthDate: yup
    .date()
    .nullable()
    .required("This field is required")
    .min(new Date(), "Start Date must be later than today"),
  film: yup.string().required("This field is required"),
  file: yup
    .mixed()
    .required("این فیلد اجباری است")
    .test(
      "fileSize",
      "اندازه بیش از حد مجاز است",
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      "فرمت فایل",
      "فرمت نامعتبر است",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});
