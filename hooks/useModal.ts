import { useState } from 'react'

export const useModal = () => {
    const [isShowing, setIsShowing] = useState<boolean>(false)

    const toggle = (): void => {
        setIsShowing(!isShowing)
    }

    return {
        isShowing,
        toggle,
    }
}
