import { Button, TextField } from "@mui";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useFormik } from "formik";
import { useAuth } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useRegister } from "services/auth";
import { validationSchema } from "utils/validationSchema";
import { useTranslation } from "next-i18next";
import { Dic } from "interfaces";

const Register: React.FC = (): React.ReactElement => {
  const { push } = useRouter();
  const { t } = useTranslation("common");
  const { state, dispatch } = useAuth();
  const [cookie, setCookie] = useCookies(["token"]);
  const { mutate, isLoading } = useRegister();

  const [message, setMessage] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: (data) => {
          dispatch({
            type: "Reg",
            payload: data.data,
          });
          setCookie("token", JSON.stringify(data.data.token), {
            path: "/",
            maxAge: 3600, // Expires after 1hr
            sameSite: true,
          });
          push("/");
        },
        onError: (data: any) => {
          setMessage(data.response.data.message);
        },
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
      {message && <Alert severity="error">{message}</Alert>}
      <Typography variant="h5">register</Typography>

      <TextField name="username" formik={formik} label={t(Dic.username)} />
      <TextField
        name="password"
        type="password"
        formik={formik}
        label={t(Dic.password)}
      />
      <TextField
        name="email"
        type="email"
        formik={formik}
        label={t(Dic.email)}
      />
      <TextField
        type="tel"
        name="phoneNumber"
        formik={formik}
        label={t(Dic.phoneNumber)}
      />

      <Button type="submit" loading={isLoading}>
        <ExitToAppIcon sx={{ mr: 1 }} />
        register
      </Button>
    </Stack>
  );
};

export default Register;
