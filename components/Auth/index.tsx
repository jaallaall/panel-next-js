import Stack from "@mui/material/Stack";
import { TextField, Button } from "@mui";
import { useFormik } from "formik";
import { mainUs } from "i18n";
import { useRegister } from "services/auth";
import { validationSchema } from "utils/validationSchema";
import { useRouter } from "next/router";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Typography } from "@mui/material";
import { useAuth } from "hooks";
import { useCookies } from "react-cookie";

const Register: React.FC = (): React.ReactElement => {
  const { push } = useRouter();
  const { state, dispatch } = useAuth();
  const [cookie, setCookie] = useCookies(["token"]);
  const { mutate } = useRegister();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      phoneNumber: 0,
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
        },
      });
    },
  });

  console.log(state);

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
      <Typography variant="h5">register</Typography>
      <TextField name="username" formik={formik} label={mainUs.username} />
      <TextField
        name="password"
        type="password"
        formik={formik}
        label={mainUs.password}
      />
      <TextField
        name="email"
        type="email"
        formik={formik}
        label={mainUs.email}
      />
      <TextField
        type="tel"
        name="phoneNumber"
        formik={formik}
        label={mainUs.phoneNumber}
      />
      <Button type="submit">
        <ExitToAppIcon sx={{ mr: 1 }} />
        register
      </Button>
    </Stack>
  );
};

export default Register;
