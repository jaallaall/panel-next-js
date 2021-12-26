import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { Typography } from "@mui/material";

const Pagination: React.FC<{
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  previousPage: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  nextPage: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageIndex: number;
  pageOptions: number[];
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  pageCount: number;
  options: number[];
}> = ({
  gotoPage,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  pageIndex,
  pageOptions,
  pageSize,
  setPageSize,
  pageCount,
  options,
}): React.ReactElement => {
  return (
    <Stack flexDirection="row" alignItems="center" sx={{ p: 2 }}>
      <IconButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        <KeyboardDoubleArrowLeftIcon />
      </IconButton>
      <IconButton onClick={() => previousPage()} disabled={!canPreviousPage}>
        <ChevronLeftIcon />
      </IconButton>
      <IconButton onClick={() => nextPage()} disabled={!canNextPage}>
        <ChevronRightIcon />
      </IconButton>
      <IconButton
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      >
        <KeyboardDoubleArrowRightIcon />
      </IconButton>
      <Typography
        component="span"
        sx={{ display: "flex", alignItems: "center", mr: 1 }}
      >
        Page
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>
      </Typography>
      {" | "}
      <Typography
        component="span"
        sx={{ display: "flex", alignItems: "center", mx: 1 }}
      >
        Go to page:
      </Typography>
      <TextField
        type="number"
        defaultValue={pageIndex + 1}
        onChange={(e) => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0;
          gotoPage(page);
        }}
        sx={{
          height: 35,
          width: 70,
          mr: 1,
          "& .MuiOutlinedInput-root": {
            height: "100%",
          },
        }}
      />
      <TextField
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
        select
        sx={{
          height: 35,
          "& .MuiOutlinedInput-root": {
            height: "100%",
          },
          "& .MuiSelect-select": {
            height: "100%",
            py: 0,
            minWidth: 60,
            display: "flex",
            alignItems: "center",
          },
        }}
        defaultValue={options[0]}
      >
        {options.map((item, i) => (
          <MenuItem value={item} key={i}>
            Show {item}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
};

export default Pagination;
