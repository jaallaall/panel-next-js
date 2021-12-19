import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'

export const EditableCell: React.FC = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
}: any) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
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
        <TextField
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            sx={{
                height: 40,
                '& .MuiOutlinedInput-root': {
                    height: '100%',
                },
                '& .MuiOutlinedInput-input': {
                    py: 0,
                },
            }}
        />
    )
}
