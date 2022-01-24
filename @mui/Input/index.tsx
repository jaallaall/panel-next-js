import { AutocompleteCustom, AutocompleteProps } from "./Autocomplete";
import { DatePickerCustom, DatePickerProps } from "./DatePicker";
import { Gender, GenderProps } from "./Gender";
import { SelectCustom, SelectProps } from "./Select";
import { TextFieldCustom, TextFieldCustomProps } from "./TextField";

type Props =
  | (AutocompleteProps & {
      mode: "autocomplete";
    })
  | (GenderProps & {
      mode: "gender";
    })
  | (DatePickerProps & {
      mode: "datePicker";
    })
  | (SelectProps & {
      mode: "select";
    })
  | (TextFieldCustomProps & {
      mode?: "TextField";
    });

export function Input(props: Props) {
  if (props.mode === "select") {
    return <SelectCustom {...props} />;
  }
  if (props.mode === "autocomplete") {
    return <AutocompleteCustom {...props} />;
  }
  if (props.mode === "datePicker") {
    return <DatePickerCustom {...props} />;
  }
  if (props.mode === "gender") {
    return <Gender {...props} />;
  }
  return <TextFieldCustom {...props} />;
}
