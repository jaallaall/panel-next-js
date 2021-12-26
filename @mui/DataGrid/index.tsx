import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
// import Button from '@mui/material/Button'
import Pagination from "./Pagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { matchSorter } from "match-sorter";
import { useEffect, useMemo, useState } from "react";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
// import { EditableCell } from "./Cell/EditableCell";
import { DefaultColumnFilter } from "./DefaultColumnFilter";
import { GlobalFilter } from "./GlobalFilter";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";
import { Divider, MenuItem, TextField } from "@mui/material";
import { EnhancedTableToolbar } from "./EnhancedTableToolbar";

function fuzzyTextFilterFn(rows: any, id: any, filterValue: any): any {
  return matchSorter(rows, filterValue, {
    keys: [(row: any) => row.values[id]],
  });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val: any) => !val;

export function DataGrid({
  columns,
  data,
  updateMyData,
  onSelectedRows,
  skipPageReset,
  handleDeleteAll,
}: any) {
  const [selected, setSelected] = useState([]);

  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows: any, id: any, filterValue: any) => {
        return rows.filter((row: any) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      // Cell: EditableCell,
    }),
    []
  );

  const {
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    selectedFlatRows,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    setPageSize,
    pageCount,
    pageOptions,
    state,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 2 },
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      // manualPagination: true,
      // pageCount: controlledPageCount,
      updateMyData,
      autoResetPage: !skipPageReset,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    },
    useSortBy,
    usePagination,
    useRowSelect
  );

  useEffect(() => {
    onSelectedRows(selectedFlatRows);
  }, [selectedFlatRows]);

  // const firstPageRows = page.slice(0, 5);
  console.log(selectedRowIds);

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = rows.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <TableContainer sx={{ position: "relative", minHeight: 400 }}>
        <EnhancedTableToolbar
          numSelected={Object.keys(selectedRowIds).length}
        />
        <Table
          sx={{ minWidth: 750, height: "100%" }}
          stickyHeader
          aria-label="sticky table"
          {...getTableProps()}
        >
          <TableHead>
            {headerGroups.map((headerGroup, inx) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} key={inx}>
                {headerGroup.headers.map((column, i) => {
                  return (
                    <TableCell
                      align="center"
                      {...column.getHeaderProps()}
                      key={i}
                      sx={{ verticalAlign: "baseline", p: 1 }}
                    >
                      <Box whiteSpace="nowrap" display="flex">
                        {column.render("Header")}
                      </Box>
                      {column.canFilter && (
                        <Box sx={{ mt: 1 }}>
                          {column.canFilter ? column.render("Filter") : null}
                        </Box>
                      )}

                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={visibleColumns.length}>
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, inx) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  key={inx}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  {row.cells.map((cell, i) => {
                    return (
                      <TableCell {...cell.getCellProps()} key={i} sx={{ p: 1 }}>
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
      <Pagination
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        setPageSize={setPageSize}
        pageSize={pageSize}
        options={[2, 4, 15, 20]}
        pageCount={pageCount}
      />
    </Paper>
  );
}

// Define a custom filter filter function!
export function filterGreaterThan(rows: any, id: any, filterValue: any) {
  return rows.filter((row: any) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val: any) => typeof val !== "number";
