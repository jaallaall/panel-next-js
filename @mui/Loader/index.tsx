import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

interface LoaderProps {
    error?: boolean
    retry?: (event: React.MouseEvent<HTMLElement>) => void
    timedOut?: boolean
    pastDelay?: boolean
}

export const Loader: React.FC<LoaderProps> = ({
    error,
    retry,
    timedOut,
    pastDelay,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                flex: '1 0 auto',
            }}
        >
            {error && (
                <div>
                    Error! <Button onClick={retry}>Retry</Button>
                </div>
            )}
            {timedOut && (
                <div>
                    Taking a long time... <Button onClick={retry}>Retry</Button>
                </div>
            )}
            {pastDelay && <div>Loading...</div>}
            <CircularProgress sx={{ margin: ({ spacing }) => spacing(2) }} />
        </Box>
    )
}
