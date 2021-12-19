import Checkbox from '@mui/material/Checkbox'

export const CheckBoxCell: React.FC<{
    value: boolean
    row: { index: number }
    column: { id: number }
    updateMyData: any
}> = ({
    value,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
}): React.ReactElement => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

    const onChange = () => {
        updateMyData(index, id, !value)
    }

    return <Checkbox {...label} checked={value} onChange={onChange} />
}
