import Stack from "@mui/material/Stack";
import { useFormik } from "formik";
import { mainUs } from "i18n";
import { useLoginUser } from "services";
import { validationSchemaLogin } from "utils/validationSchema";
import { useRouter } from "next/router";
import { Button, Link, TextField } from "@mui";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Typography } from "@mui/material";
import { useCookies } from "react-cookie";
const Login: React.FC = (): React.ReactElement => {
  const { push } = useRouter();
  const [cookie, setCookie] = useCookies(["token"]);
  const { mutate } = useLoginUser();

  const formik = useFormik({
    initialValues: {
      username: "",
      phoneNumber: "",
    },
    validationSchema: validationSchemaLogin,
    onSubmit: (values) => {
      console.log(values);
      mutate(values, {
        onSuccess: (data) => {
          setCookie("token", JSON.stringify(data.data.token), {
            path: "/",
            maxAge: 3600, // Expires after 1hr
            sameSite: true,
          });
          // push("/");
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
      <Typography variant="h5">Login</Typography>
      <TextField name="username" formik={formik} label={mainUs.username} />
      <TextField
        name="password"
        type="password"
        formik={formik}
        label={mainUs.password}
      />
      <Button type="submit">
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
