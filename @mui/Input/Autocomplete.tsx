import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { FormikProps } from "formik";

export interface AutocompleteProps {
  label?: string;
  formik?: FormikProps<any>;
  name: string;
  options: readonly any[];
  titleBased: string;
  id?: string;
  multiple?: boolean;
  render: (
    e: any
  ) =>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | string;
}

export const AutocompleteCustom: React.FC<AutocompleteProps> = ({
  label,
  formik,
  name,
  options,
  titleBased,
  id,
  multiple,
  render,
}): React.ReactElement => {
  //   console.log(formik);
  return (
    <Autocomplete
      id={id}
      fullWidth
      multiple={multiple}
      options={options}
      autoHighlight
      getOptionLabel={(option: unknown) => (option as any)[titleBased]}
      value={formik?.values[name]}
      onChange={(_, newValue) => formik?.setFieldValue(name, newValue)}
      renderOption={(props, option: any) => (
        <Box component="li" {...props}>
          {render(option)}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
          }}
          error={formik?.touched[name] && Boolean(formik?.errors[name])}
          helperText={formik?.touched[name] && formik?.errors[name]}
        />
      )}
    />
  );
};
