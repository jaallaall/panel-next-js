import Slider from '@mui/material/Slider'
import { useMemo } from 'react'

function valuetext(value: number) {
    return value
}

export function SliderColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}: any) {
    // Calculate the min and max
    // using the preFilteredRows

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
        <>
            {/* <input
                type="range"
                min={min}
                max={max}
                value={filterValue || min}
                onChange={(e) => {
                    setFilter(parseInt(e.target.value, 10))
                }}
            /> */}
            <Slider
                aria-label="Temperature"
                defaultValue={filterValue || min}
                min={min}
                max={max}
                // getAriaValueText={valuetext}
                onChange={(e: any) => {
                    setFilter(parseInt(e.target.value, 10))
                }}
                sx={{ width: 100 }}
            />
            {/* <Button onClick={() => setFilter(0)}>Off</Button> */}
        </>
    )
}
