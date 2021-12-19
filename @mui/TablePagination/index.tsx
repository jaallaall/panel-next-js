import TablePagination from '@mui/material/TablePagination'
import { useState } from 'react'

export const TablePaginationCustom: React.FC = (): React.ReactElement => {
    const [page, setPage] = useState(2)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    return (
        <TablePagination
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    )
}
