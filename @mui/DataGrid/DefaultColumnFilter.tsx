import TextField from '@mui/material/TextField'

export const DefaultColumnFilter: React.FC<{
    column: { filterValue: any; preFilteredRows: any; setFilter: any }
}> = ({
    column: { filterValue, preFilteredRows, setFilter },
}): React.ReactElement => {
    const count = preFilteredRows.length

    return (
        <TextField
            value={filterValue || ''}
            onChange={(e) => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}
            sx={{
                height: 45,
                '& .MuiOutlinedInput-root': {
                    height: '100%',
                },
            }}
        />
    )
}
