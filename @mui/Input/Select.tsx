import MenuItem from "@mui/material/MenuItem";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { FormikProps } from "formik";

export type SelectProps = {
  options: { [key: string]: any }[];
  label?: React.ReactNode;
  id?: string;
  titleBased: string;
  formik?: FormikProps<any>;
  name: string;
  handleChange?: (e: any) => any;
  value?: unknown;
} & TextFieldProps;

export const SelectCustom: React.FC<SelectProps> = ({
  options,
  label,
  id,
  titleBased,
  formik,
  name,
  handleChange,
  value,
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
      value={formik ? formik.values[name] : value}
      onChange={formik ? formik.handleChange : handleChange}
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
