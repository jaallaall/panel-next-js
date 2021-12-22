import MenuItem from "@mui/material/MenuItem";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { FormikProps } from "formik";

export const SelectCustom: React.FC<
  {
    options: { [key: string]: any }[];
    label?: React.ReactNode;
    id?: string;
    titleBased: string;
    formik?: FormikProps<any>;
    name: string;
  } & TextFieldProps
> = ({
  options,
  label,
  id,
  titleBased,
  formik,
  name,
  ...rest
}): React.ReactElement => {
  // const [age, setAge] = useState('');

  // const handleChange = (event: SelectChangeEvent) => {
  // 	setAge(event.target.value as string);
  // };
  return (
    <TextField
      name={name}
      id={id}
      value={formik?.values[name]}
      onChange={formik?.handleChange}
      label={label}
      select
      error={formik?.touched[name] && Boolean(formik?.errors[name])}
      helperText={formik?.touched[name] && formik?.errors[name]}
      {...rest}
      defaultValue={options[0][titleBased]}
    >
      {options.map((item, i) => (
        <MenuItem value={item[titleBased]} key={i}>
          {item[titleBased]}
        </MenuItem>
      ))}
    </TextField>
  );
};
