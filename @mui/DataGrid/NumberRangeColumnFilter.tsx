import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { dic } from 'i18n'
import { useMemo } from 'react'

export function NumberRangeColumnFilter({
    column: { filterValue = [], preFilteredRows, setFilter, id },
}: any) {
    const [min, max] = useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        preFilteredRows.forEach((row: any) => {
            min = Math.min(row.values[id], min)
            max = Math.max(row.values[id], max)
        })
        return [min, max]
    }, [id, preFilteredRows])

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <TextField
                value={filterValue[0] || ''}
                type="number"
                onChange={(e) => {
                    const val = e.target.value
                    setFilter((old = []) => [
                        val ? parseInt(val, 10) : undefined,
                        old[1],
                    ])
                }}
                placeholder={`Min (${min})`}
                sx={{
                    height: 45,
                    width: 60,
                    '& .MuiOutlinedInput-root': {
                        height: '100%',
                    },
                }}
            />

            <Typography sx={{ mx: 1 }}>{dic.to}</Typography>
            <TextField
                value={filterValue[1] || ''}
                type="number"
                onChange={(e) => {
                    const val = e.target.value
                    setFilter((old = []) => [
                        old[0],
                        val ? parseInt(val, 10) : undefined,
                    ])
                }}
                placeholder={`Max (${max})`}
                sx={{
                    height: 45,
                    width: 60,
                    '& .MuiOutlinedInput-root': {
                        height: '100%',
                    },
                }}
            />
        </Box>
    )
}
