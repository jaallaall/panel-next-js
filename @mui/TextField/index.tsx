import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { FormikProps } from "formik";
import { useState } from "react";

export const TextFieldCustom: React.FC<
  {
    name: string;
    label?: React.ReactNode;
    formik?: FormikProps<any>;
    type?: React.HTMLInputTypeAttribute;
  } & TextFieldProps
> = ({ name, label, formik, type = "text", ...rest }): React.ReactElement => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <TextField
      id="outlined-basic"
      name={name}
      label={label}
      variant="outlined"
      onChange={formik?.handleChange}
      value={formik?.values[name]}
      error={formik?.touched[name] && Boolean(formik?.errors[name])}
      type={type === "password" && !showPassword ? "password" : "text" || type}
      helperText={formik?.touched[name] && formik?.errors[name]}
      InputProps={{
        endAdornment: type === "password" && (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
};
