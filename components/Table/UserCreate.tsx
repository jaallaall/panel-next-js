import { Button, Gender, Select, TextField } from "@mui";
import Stack from "@mui/material/Stack";
import { useFormik } from "formik";
import { Options, Dic } from "interfaces";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { useUserCreate, useUserUpdate } from "services";
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

const UserCreate: React.FC<{
  dataRow?: Options;
  toggle?: () => void;
  toggleAdd?: () => void;
  createUser?: boolean;
}> = ({ toggle, toggleAdd, dataRow, createUser }): React.ReactElement => {
  const queryClient = useQueryClient();
  const { t } = useTranslation("common");
  const { pathname } = useRouter();

  const { mutate, isLoading } = useUserCreate();
  const { mutate: mutateUpdate } = useUserUpdate();

  const formik = useFormik({
    initialValues: {
      message: dataRow?.message ?? "",
      gender: dataRow?.query_param.gender ?? "male",
      city: dataRow?.query_param.city ?? "",
      number: dataRow?.number ?? 1,
    },
    validationSchema: validationSchemaUser,
    onSubmit: (values, { resetForm }) => {
      if (pathname.endsWith("user-create") || createUser) {
        mutate(values, {
          onSuccess: () => {
            if (toggleAdd) {
              toggleAdd();
            }
            queryClient.invalidateQueries("userAll");
            resetForm();
          },
        });
      }

      if (!createUser)
        mutateUpdate(
          { ...values, id: dataRow?.id },
          {
            onSuccess: () => {
              if (toggle) {
                toggle();
              }
              queryClient.invalidateQueries("userAll");
              resetForm();
            },
            onError: (data: any) => {},
          }
        );
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
      id="form"
    >
      <TextField
        name="message"
        formik={formik}
        label={t(Dic.message)}
        multiline
        rows={5}
      />
      <Select
        name="city"
        formik={formik}
        label={t(Dic.city)}
        options={countries}
        titleBased="label"
      />

      <Gender formik={formik} name={t(Dic.gender)} />

      <TextField
        type="number"
        name="number"
        formik={formik}
        label={t(Dic.number)}
      />
      {pathname.endsWith("user-create") && (
        <Button type="submit" loading={isLoading}>
          create
        </Button>
      )}
    </Stack>
  );
};

export default UserCreate;
