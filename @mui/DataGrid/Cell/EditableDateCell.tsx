import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import AdapterJalali from '@date-io/date-fns-jalali'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'

export const EditableDateCell: React.FC = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
}: any) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState<Date | null>(null)

    const handleChangeDate = (newValue: Date | null) => {
        setValue(newValue)
        updateMyData(index, id, value)
    }

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateMyData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return (
        <LocalizationProvider dateAdapter={AdapterJalali}>
            <DatePicker
                mask="____/__/__"
                value={value}
                onChange={handleChangeDate}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                height: 40,
                            },
                        }}
                    />
                )}
            />
        </LocalizationProvider>
    )
}
