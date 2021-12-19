import Box, { BoxProps } from '@mui/material/Box'

export const BoxCustom: React.FC<BoxProps> = ({
    children,
    ...rest
}): React.ReactElement => {
    return <Box {...rest}>{children}</Box>
}
