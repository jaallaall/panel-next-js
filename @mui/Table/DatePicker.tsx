import AdapterJalali from "@date-io/date-fns-jalali";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";

export const DatePickerFilter: React.FC<{
  label?: string;
  column: { filterValue: any; preFilteredRows: any; setFilter: any };
}> = ({
  label,
  column: { filterValue, preFilteredRows, setFilter },
}): React.ReactElement => {
  const count = preFilteredRows.length;
  return (
    <LocalizationProvider dateAdapter={AdapterJalali}>
      <DatePicker
        mask="____/__/__"
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            // sx={{
            //   "& .MuiOutlinedInput-root": {
            //     height: 50,
            //   },
            // }}
          />
        )}
        label={label}
      />
    </LocalizationProvider>
  );
};
