import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { useDebounce, useLocalStorage } from "hooks";
import {
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from "react";
import {
  Cell,
  CellProps,
  ColumnInstance,
  FilterProps,
  HeaderGroup,
  HeaderProps,
  Hooks,
  Meta,
  Row,
  TableInstance,
  TableOptions,
  useColumnOrder,
  useExpanded,
  useFilters,
  useFlexLayout,
  useGlobalFilter,
  useGroupBy,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { camelToWords } from "utils";
import { ActionsGrid } from "./ActionGrid";
import { FilterChipBar } from "./FilterChipBar";
import { fuzzyTextFilter, numericTextFilter } from "./filters";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";
import { TablePagination } from "./TablePagination";
import { TableToolbar } from "./TableToolbar";
import { TooltipCellRenderer } from "./TooltipCell";

export interface TableProperties<T extends Record<string, unknown>>
  extends TableOptions<T> {
  name: string;
  onAdd?: (instance: TableInstance<T>) => MouseEventHandler;
  onDelete?: (instance: TableInstance<T>) => MouseEventHandler;
  onEdit?: (instance: TableInstance<T>) => MouseEventHandler;
  onClick?: (row: Row<T>) => void;
  setDataRow?: (e?: any) => void;
  toggleDelete?: () => void;
  handleClickEddit?: () => void;
  sizePage: number;
}

const DefaultHeader: React.FC<HeaderProps<any>> = ({ column }) => {
  return <>{column.id.startsWith("_") ? null : camelToWords(column.id)}</>;
};

// yes this is recursive, but the depth never exceeds three so it seems safe enough
const findFirstColumn = <T extends Record<string, unknown>>(
  columns: Array<ColumnInstance<T>>
): ColumnInstance<T> =>
  columns[0].columns ? findFirstColumn(columns[0].columns) : columns[0];

function DefaultColumnFilter<T extends Record<string, unknown>>({
  columns,
  column,
}: FilterProps<T>) {
  const { id, filterValue, setFilter, render, canFilter } = column;
  const [value, setValue] = useState(filterValue || "");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  // ensure that reset loads the new value
  useEffect(() => {
    setValue(filterValue || "");
  }, [filterValue]);

  const isFirstColumn = findFirstColumn(columns) === column;

  return (
    <TextField
      name={id}
      label={render("Header")}
      InputLabelProps={{ htmlFor: id }}
      value={value}
      autoFocus={isFirstColumn}
      variant="outlined"
      onChange={handleChange}
      onBlur={(e) => {
        setFilter(e.target.value || undefined);
      }}
    />
  );
}

const getStyles = (props: any, disableResizing = false, align = "left") => [
  props,
  {
    style: {
      // justifyContent: "center",
      alignItems: "center",
      display: "flex",
    },
  },
];

const selectionHook = (hooks: Hooks<any>) => {
  hooks.allColumns.push((columns) => [
    // Let's make a column for selection
    {
      id: "_selector",
      disableResizing: true,
      disableGroupBy: true,
      minWidth: 60,
      width: 60,
      maxWidth: 60,
      Aggregated: undefined,
      // The header can use the table's getToggleAllRowsSelectedProps method
      // to render a checkbox
      Header: ({ getToggleAllRowsSelectedProps }: HeaderProps<any>) => (
        <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
      ),
      // The cell can use the individual row's getToggleRowSelectedProps method
      // to the render a checkbox
      Cell: ({ row }: CellProps<any>) => (
        <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
      ),
    },

    ...columns,
    {
      id: "actions",
      Header: () => <>{"actions"}</>,
      Cell: ({
        setDataRow,
        toggleDelete,
        handleClickEddit,
        row,
      }: React.PropsWithChildren<
        CellProps<any, any> & {
          setDataRow: (e?: any) => void;
          toggleDelete: () => void;
          handleClickEddit: () => void;
        }
      >) => {
        return (
          <ActionsGrid
            toggleDelete={() => {
              toggleDelete();
              setDataRow(row.original);
            }}
            handleClickEddit={() => {
              handleClickEddit();
              setDataRow(row.original);
            }}
          />
        );
      },
    },
  ]);
  hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
    // fix the parent group of the selection button to not be resizable
    const selectionGroupHeader = headerGroups[0].headers[0];
    selectionGroupHeader.canResize = false;
  });
};

const headerProps = <T extends Record<string, unknown>>(
  props: any,
  { column }: Meta<T, { column: HeaderGroup<T> }>
) => getStyles(props, column && column.disableResizing, column && column.align);

const cellProps = <T extends Record<string, unknown>>(
  props: any,
  { cell }: Meta<T, { cell: Cell<T> }>
) =>
  getStyles(
    props,
    cell.column && cell.column.disableResizing,
    cell.column && cell.column.align
  );

const defaultColumn = {
  Filter: DefaultColumnFilter,
  Cell: TooltipCellRenderer,
  Header: DefaultHeader,
  // When using the useFlexLayout:
  minWidth: 5,
  width: 120,
  maxWidth: 400,
};

const hooks = [
  useColumnOrder,
  useFilters,
  useGroupBy,
  useGlobalFilter,
  useSortBy,
  useExpanded,
  useFlexLayout,
  usePagination,
  useResizeColumns,
  useRowSelect,
  selectionHook,
];

const filterTypes = {
  fuzzyText: fuzzyTextFilter,
  numeric: numericTextFilter,
};

export function DataGrid<T extends Record<string, unknown>>(
  props: PropsWithChildren<TableProperties<T>>
): ReactElement {
  const { name, columns, onAdd, onDelete, onEdit, onClick, sizePage } = props;
  const [initialState, setInitialState] = useLocalStorage(
    `tableState:${name}`,
    {}
  );
  const instance = useTable<T>(
    {
      ...props,
      columns,
      defaultColumn,
      initialState,
    },
    ...hooks
  );

  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    page,
    prepareRow,
    state,
  } = instance;
  const debouncedState = useDebounce(state, 500);

  useEffect(() => {
    const { sortBy, filters, pageSize, columnResizing, hiddenColumns } =
      debouncedState;
    const val = {
      sortBy,
      filters,
      pageSize: sizePage ?? 10,
      columnResizing,
      hiddenColumns,
    };
    setInitialState(val);
  }, [setInitialState, debouncedState, sizePage]);

  const cellClickHandler = (cell: Cell<T>) => () => {
    onClick &&
      !cell.column.isGrouped &&
      !cell.row.isGrouped &&
      cell.column.id !== "_selector" &&
      onClick(cell.row);
  };

  const { role: tableRole, ...tableProps } = getTableProps();
  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <TableContainer sx={{ position: "relative", minHeight: 400 }}>
        <TableToolbar instance={instance} {...{ onAdd, onDelete, onEdit }} />
        <FilterChipBar<T> instance={instance} />
        <Table
          sx={{ height: "100%", whiteSpace: "pre-wrap" }}
          stickyHeader
          aria-label="sticky table"
          {...tableProps}
        >
          <TableHead>
            {headerGroups.map((headerGroup, inx) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} key={inx}>
                {headerGroup.headers.map((column, i) => {
                  const style = {
                    textAlign: column.align ? column.align : "left ",
                  } as React.CSSProperties;
                  const {
                    key: headerKey,
                    role: headerRole,
                    ...getHeaderProps
                  } = column.getHeaderProps(headerProps);
                  const { title: groupTitle = "", ...columnGroupByProps } =
                    column.getGroupByToggleProps();
                  const { title: sortTitle = "", ...columnSortByProps } =
                    column.getSortByToggleProps();
                  return (
                    <TableCell
                      align="center"
                      {...getHeaderProps}
                      key={i}
                      sx={{
                        verticalAlign: "middle",
                        p: 1,
                      }}
                    >
                      <>{column.render("Header")}</>
                      {/* {column.canFilter && (
                        <>{column.canFilter ? column.render("Filter") : null}</>
                      )} */}

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
                    const {
                      key: cellKey,
                      role: cellRole,
                      ...getCellProps
                    } = cell.getCellProps(cellProps);
                    return (
                      <TableCell
                        {...getCellProps}
                        key={i}
                        sx={{ p: 1 }}
                        onClick={cellClickHandler(cell)}
                      >
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
      <TablePagination<T> instance={instance} sizePage={sizePage} />
    </Paper>
  );
}
