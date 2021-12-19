import TextField from '@mui/material/TextField'
import { dic } from 'i18n'
import { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

export const GlobalFilter: React.FC<{
    preGlobalFilteredRows: any
    globalFilter: any
    setGlobalFilter: any
}> = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}): React.ReactElement => {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined)
    }, 200)
    return (
        <TextField
            value={value || ''}
            onChange={(e) => {
                setValue(e.target.value)
                onChange(e.target.value)
            }}
            placeholder={`${count} records...`}
            sx={{
                '& .MuiOutlinedInput-root': {
                    height: 45,
                },
                '& .MuiOutlinedInput-input': {
                    py: 1,
                },
                '& .MuiInputLabel-root': {
                    top: -5,
                },
            }}
            label={dic.search}
        />
    )
}
