import { Breakpoint } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'

const BootstrapDialogTitle: React.FC<{
    id: string
    onClose: () => void
}> = ({ children, onClose, ...other }): React.ReactElement => {
    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <svg
                        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                        focusable="false"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        data-testid="CloseIcon"
                        fill="currentcolor"
                        width={20}
                    >
                        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                    </svg>
                </IconButton>
            ) : null}
        </DialogTitle>
    )
}

export const MuiDialog: React.FC<{
    title?: string
    dialogActions?: React.ReactNode
    handleClickOpen: (e?: boolean) => void
    open: boolean
    maxWidth?: false | Breakpoint
}> = ({
    title,
    dialogActions,
    handleClickOpen,
    open,
    children,
    maxWidth,
}): React.ReactElement => {
    const handleClose: () => void = () => {
        handleClickOpen(false)
    }

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            sx={{
                '& .MuiPaper-root': {
                    width: '100%',
                },
                '& .MuiDialogContent-root': {
                    padding: ({ spacing }) => spacing(2),
                },
                '& .MuiDialogActions-root': {
                    padding: ({ spacing }) => spacing(1),
                },
            }}
            maxWidth={maxWidth}
        >
            {title && (
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                >
                    {title}
                </BootstrapDialogTitle>
            )}

            <DialogContent dividers>{children}</DialogContent>
            {dialogActions && <DialogActions>{dialogActions}</DialogActions>}
        </Dialog>
    )
}
