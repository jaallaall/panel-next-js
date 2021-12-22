import { Button, Gender, Select, TextField } from "@mui";
import Stack from "@mui/material/Stack";
import { useFormik } from "formik";
import { mainUs } from "i18n";
import { useUserCreate } from "services";
import { validationSchemaUser } from "utils";

export const countries = [
  { code: "AD", label: "shiraz", phone: "376" },
  {
    code: "AE",
    label: "esfahan",
    phone: "971",
  },
  { code: "AF", label: "tehran", phone: "93" },
  {
    code: "AG",
    label: "kerman",
    phone: "1-268",
  },
  { code: "AI", label: "gilan", phone: "1-264" },
];

const MessageMarketing: React.FC = (): React.ReactElement => {
  const { mutate, isLoading } = useUserCreate();

  const formik = useFormik({
    initialValues: {
      message: "",
      gender: "male",
      city: "",
      number: 1,
    },
    validationSchema: validationSchemaUser,
    onSubmit: (values, { resetForm }) => {
      mutate(values, {
        onSuccess: (data) => {
          resetForm();
        },
        onError: (data: any) => {},
      });
    },
  });

  return (
    <Stack
      component="form"
      spacing={2}
      onSubmit={formik.handleSubmit}
      sx={{
        bgcolor: "#fff",
        borderRadius: 2,
        border: "1px solid rgba(0,0,0,.2)",
        p: 2,
      }}
    >
      <TextField
        name="message"
        formik={formik}
        label={mainUs.message}
        multiline
        rows={5}
      />
      <Select
        name="city"
        formik={formik}
        label={mainUs.city}
        options={countries}
        titleBased="label"
      />

      <Gender formik={formik} name={mainUs.gender} />

      <TextField
        type="number"
        name="number"
        formik={formik}
        label={mainUs.number}
      />
      <Button type="submit" loading={isLoading}>
        create
      </Button>
    </Stack>
  );
};

export default MessageMarketing;
