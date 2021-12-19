import AdapterJalali from '@date-io/date-fns-jalali'
import DatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import TextField from '@mui/material/TextField'
import { FormikProps } from 'formik'
import { SxPropes } from 'interfaces'

export const DatePickerCustom: React.FC<{
    label?: string
    formik?: FormikProps<any>
    name: string
    sx?: SxPropes
}> = ({ label, name, formik, sx }): React.ReactElement => {
    return (
        <LocalizationProvider dateAdapter={AdapterJalali}>
            <DatePicker
                mask="____/__/__"
                value={formik?.values[name]}
                onChange={(newValue) => formik?.setFieldValue(name, newValue)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        sx={sx}
                        error={
                            formik?.touched[name] &&
                            Boolean(formik?.errors[name])
                        }
                        helperText={
                            formik?.touched[name] && formik?.errors[name]
                        }
                    />
                )}
                label={label}
            />
        </LocalizationProvider>
    )
}
