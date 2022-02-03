import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { FormikProps } from "formik";
import { useTranslate } from "hooks";

export interface GenderProps {
  name: string;
  formik?: FormikProps<any>;
}

export const Gender: React.FC<GenderProps> = ({
  name,
  formik,
}): React.ReactElement => {
  const { t } = useTranslate();
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
          value={formik?.values[name]}
        >
          <FormControlLabel
            value="male"
            control={<Radio />}
            label={t("male") as string}
          />
          <FormControlLabel
            value="female"
            control={<Radio />}
            label={t("female") as string}
          />
          <FormControlLabel
            value="other"
            control={<Radio />}
            label={t("other") as string}
          />
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
