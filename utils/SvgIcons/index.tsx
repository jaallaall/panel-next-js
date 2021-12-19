import Box, { BoxProps } from '@mui/material/Box'
import { ReactSVG } from 'react-svg'

export interface IconProps {
    color?: any
    hover?: any
    size?: React.CSSProperties['width' | 'height']
    w?: React.CSSProperties['width']
    name?: string
    cursorPointer?: boolean
    currentColor?: boolean
}

export const Icon: React.FC<IconProps & BoxProps> = ({
    name,
    color,
    size,
    hover,
    cursorPointer,
    currentColor,
    ...rest
}): React.ReactElement => {
    return (
        <Box
            sx={{
                color: color,
                display: 'inline-block',
                verticalAlign: 'middle',
                lineHeight: 0,
                '&:hover': {
                    color: hover
                        ? hover
                        : color?.replace(/main|light/gi, 'dark'),
                    '& svg path,& svg rect': {
                        fill: hover ? 'currentcolor' : '',
                    },
                    '& svg text': {
                        fill: hover ? 'currentcolor' : '',
                        fontSize: 'inherit',
                    },
                },
                '& svg': {
                    width: size ? size + 'px' : '20px',
                    height: size ? size + 'px' : '20px',
                },
                '& svg path,& svg rect': {
                    fill: currentColor ? 'currentcolor' : '',
                },
                cursor: cursorPointer ? 'pointer' : '',
            }}
            component="span"
            {...rest}
        >
            <ReactSVG src={`/icons/${name}.svg`} />
        </Box>
    )
}
