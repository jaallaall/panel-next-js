import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Stack, TablePagination as _MuiTablePagination } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { memo, useCallback } from "react";
import { TableInstance } from "react-table";

// const rowsPerPageOptions = [10, 25, 50];

// avoid all of the redraws caused by the internal withStyles
const interestingPropsEqual = (prevProps: any, nextProps: any) =>
  prevProps.count === nextProps.count &&
  prevProps.rowsPerPage === nextProps.rowsPerPage &&
  prevProps.page === nextProps.page &&
  prevProps.onChangePage === nextProps.onChangePage &&
  prevProps.onChangeRowsPerPage === nextProps.onChangeRowsPerPage;

// a bit of a type hack to keep OverridableComponent working as desired
type T = typeof _MuiTablePagination;
const MuiTablePagination: T = memo(
  _MuiTablePagination,
  interestingPropsEqual
) as T;

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Stack flexDirection="row" alignItems="center" sx={{ p: 2 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Stack>
  );
}

export function TablePagination<T extends Record<string, unknown>>({
  sizePage,
  instance,
}: React.PropsWithChildren<{
  instance: TableInstance<T>;
  sizePage: number;
}>): React.ReactElement | null {
  const {
    state: { pageIndex, pageSize, rowCount = instance.rows.length },
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = instance;

  // useEffect(() => {
  //   setPageSize(Number(rowsPerPageOptions[0]));
  // }, []);

  const handleChangePage = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
      newPage: number
    ) => {
      if (newPage === pageIndex + 1) {
        nextPage();
      } else if (newPage === pageIndex - 1) {
        previousPage();
      } else {
        gotoPage(newPage);
      }
    },
    [gotoPage, nextPage, pageIndex, previousPage]
  );

  const onChangeRowsPerPage = useCallback(
    (e) => {
      setPageSize(Number(e.target.value));
    },
    [setPageSize]
  );

  const rowOptions = Array.from(
    { length: rowCount > sizePage ? Math.ceil(rowCount / sizePage) + 1 : 2 },
    (_, i) => i * sizePage
  ).filter((num) => num > 0);

  return rowCount ? (
    <MuiTablePagination
      rowsPerPageOptions={rowOptions}
      component="div"
      count={rowCount}
      rowsPerPage={pageSize}
      page={pageIndex}
      SelectProps={{
        inputProps: {
          "aria-label": "rows per page",
        },
      }}
      onPageChange={handleChangePage}
      onRowsPerPageChange={onChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
    />
  ) : null;
}
