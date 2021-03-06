import { Button, Link, TextField } from "@mui";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useTranslate } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useLoginUser } from "services";
import { validationSchemaLogin } from "utils/validationSchema";

const Login: React.FC = (): React.ReactElement => {
  const { push } = useRouter();
  const { t } = useTranslate();
  const [cookie, setCookie] = useCookies(["token"]);
  const { mutate, isLoading } = useLoginUser();

  const [message, setMessage] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      username: "",
      phoneNumber: "",
    },
    validationSchema: validationSchemaLogin,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: (data) => {
          setCookie("token", JSON.stringify(data.data.token), {
            path: "/",
            maxAge: 3600, // Expires after 1hr
            sameSite: true,
          });
          push("/");
        },
        onError: (data: any) => {
          console.log(data.response);
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
      <Typography variant="h5">Login</Typography>
      <TextField name="username" formik={formik} label={t("username")} />
      <TextField
        name="password"
        type="password"
        formik={formik}
        label={t("password")}
      />

      <Button type="submit" loading={isLoading}>
        <ExitToAppIcon sx={{ mr: 1 }} />
        login
      </Button>
      <Typography textAlign="center">
        {"Don't have an account ? "}
        <Link href="/register">Free Resister</Link>
      </Typography>
    </Stack>
  );
};

export default Login;
