import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useMemo } from 'react'

export const SelectColumnFilter: React.FC<{
    column: { filterValue: any; setFilter: any; preFilteredRows: any; id: any }
}> = ({
    column: { filterValue, setFilter, preFilteredRows, id },
}): React.ReactElement => {
    const options = useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach((row: any) => {
            options.add(row.values[id])
        })
        return [...(options.values() as any)]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
        <Select
            value={filterValue}
            onChange={(e) => {
                setFilter(e.target.value || undefined)
            }}
            defaultValue="all"
            sx={{ width: 100, height: 45 }}
        >
            <MenuItem value="all">All</MenuItem>
            {options.map((option, i) => (
                <MenuItem key={i} value={option}>
                    {option}
                </MenuItem>
            ))}
        </Select>
    )
}
