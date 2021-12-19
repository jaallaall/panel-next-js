import { CircularProgress } from '@mui/material'
import { Suspense as CustomSuspense } from 'react'

export const Suspense: React.FC = ({ children }): React.ReactElement => {
    return (
        <CustomSuspense fallback={() => <CircularProgress />}>
            {children}
        </CustomSuspense>
    )
}
