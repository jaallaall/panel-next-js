import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { FormikProps } from "formik";

export const Gender: React.FC<{ name: string; formik?: FormikProps<any> }> = ({
  name,
  formik,
}): React.ReactElement => {
  return (
    <>
      <FormControl
        component="fieldset"
        sx={{
          "& .MuiFormGroup-root": {
            flexDirection: "row",
          },
        }}
      >
        <RadioGroup
          aria-label="gender"
          defaultValue="male"
          name={name}
          onChange={formik?.handleChange}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
      {formik?.touched && (
        <Typography
          color="error"
          sx={{ ml: "14px !important", mt: "0 !important", fontSize: 12 }}
        >
          {formik?.errors[name]}
        </Typography>
      )}
    </>
  );
};
