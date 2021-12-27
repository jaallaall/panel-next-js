import { useEffect, forwardRef, MutableRefObject, useRef } from 'react'
import Checkbox from '@mui/material/Checkbox'

interface Props {
    indeterminate?: boolean
}

const useCombinedRefs = (...refs: any): MutableRefObject<any> => {
    const targetRef = useRef()

    useEffect(() => {
        refs.forEach((ref: any) => {
            if (!ref) return

            if (typeof ref === 'function') {
                ref(targetRef.current)
            } else {
                ref.current = targetRef.current
            }
        })
    }, [refs])

    return targetRef
}

export const IndeterminateCheckbox = forwardRef<HTMLInputElement, Props>(
    ({ indeterminate, ...rest }, ref: React.Ref<HTMLInputElement>) => {
        const defaultRef = useRef(null)
        const combinedRef = useCombinedRefs(ref, defaultRef)

        useEffect(() => {
            if (combinedRef?.current) {
                combinedRef.current.indeterminate = indeterminate ?? false
            }
        }, [combinedRef, indeterminate])
        const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
        return <Checkbox {...label} ref={combinedRef} {...rest} />
    }
)
