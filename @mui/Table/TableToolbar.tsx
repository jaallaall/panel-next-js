import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/CreateOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import FilterListIcon from "@mui/icons-material/FilterList";
import ViewColumnsIcon from "@mui/icons-material/ViewColumn";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import { useCallback, useState } from "react";
import { TableInstance, useAsyncDebounce } from "react-table";
import { TableMouseEventHandler } from "react-table-config";
import { ColumnHidePage } from "./ColumnHidePage";
import { FilterPage } from "./FilterPage";

type InstanceActionButton<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
  icon?: JSX.Element;
  onClick: TableMouseEventHandler;
  enabled?: (instance: TableInstance<T>) => boolean;
  label: string;
  variant?: "right" | "left";
};

type ActionButton = {
  icon?: JSX.Element;
  onClick: React.MouseEventHandler;
  enabled?: boolean;
  label: string;
  variant?: "right" | "left";
};

export const InstanceLabeledActionButton = <T extends Record<string, unknown>>({
  instance,
  icon,
  onClick,
  label,
  enabled = () => true,
}: InstanceActionButton<T>): React.ReactElement => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick(instance)}
    disabled={!enabled(instance)}
  >
    {icon}
    {label}
  </Button>
);

export const LabeledActionButton = ({
  icon,
  onClick,
  label,
  enabled = true,
}: ActionButton): React.ReactElement => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick}
    disabled={!enabled}
  >
    {icon}
    {label}
  </Button>
);

export const InstanceSmallIconActionButton = <
  T extends Record<string, unknown>
>({
  instance,
  icon,
  onClick,
  label,
  enabled = () => true,
  variant,
}: InstanceActionButton<T>): React.ReactElement => {
  return (
    <Tooltip title={label} aria-label={label}>
      <span>
        <IconButton onClick={onClick(instance)} disabled={!enabled(instance)}>
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export const SmallIconActionButton = ({
  icon,
  onClick,
  label,
  enabled = true,
  variant,
}: ActionButton): React.ReactElement => {
  return (
    <Tooltip title={label} aria-label={label}>
      <span>
        <IconButton onClick={onClick} disabled={!enabled}>
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
};

type TableToolbarProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
  onAdd?: (instance: TableInstance<T>, e?: "add") => React.MouseEventHandler;
  onDelete?: (
    instance: TableInstance<T>,
    e?: "delete"
  ) => React.MouseEventHandler;
  onEdit?: (instance: TableInstance<T>, e?: "edit") => React.MouseEventHandler;
};

export function TableToolbar<T extends Record<string, unknown>>({
  instance,
  onAdd,
  onDelete,
  onEdit,
}: React.PropsWithChildren<TableToolbarProps<T>>): React.ReactElement | null {
  const { columns, preGlobalFilteredRows, setGlobalFilter, state } = instance;
  const count = preGlobalFilteredRows?.length ?? 0;
  const [anchorEl, setAnchorEl] = useState<Element | undefined>(undefined);
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const hideableColumns = columns.filter(
    (column) => !(column.id === "_selector")
  );
  const [value, setValue] = useState(state.globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  const handleColumnsClick = useCallback(
    (event: React.MouseEvent) => {
      setAnchorEl(event.currentTarget);
      setColumnsOpen(true);
    },
    [setAnchorEl, setColumnsOpen]
  );

  const handleFilterClick = useCallback(
    (event: React.MouseEvent) => {
      setAnchorEl(event.currentTarget);
      setFilterOpen(true);
    },
    [setAnchorEl, setFilterOpen]
  );

  const handleClose = useCallback(() => {
    setColumnsOpen(false);
    setFilterOpen(false);
    setAnchorEl(undefined);
  }, []);

  return (
    <Toolbar sx={{ justifyContent: "space-between" }}>
      <Box>
        {onAdd && (
          <InstanceSmallIconActionButton<T>
            instance={instance}
            icon={<AddIcon />}
            onClick={() => onAdd(instance, "add")}
            label="Add"
            enabled={({ state }: TableInstance<T>) =>
              !state.selectedRowIds ||
              Object.keys(state.selectedRowIds).length === 0
            }
            variant="left"
          />
        )}
        {onEdit && (
          <InstanceSmallIconActionButton<T>
            instance={instance}
            icon={<CreateIcon />}
            onClick={() => onEdit(instance, "edit")}
            label="Edit"
            enabled={({ state }: TableInstance<T>) =>
              state.selectedRowIds &&
              Object.keys(state.selectedRowIds).length === 1
            }
            variant="left"
          />
        )}
        {onDelete && (
          <InstanceSmallIconActionButton<T>
            instance={instance}
            icon={<DeleteIcon />}
            onClick={() => onDelete(instance, "delete")}
            label="Delete"
            enabled={({ state }: TableInstance<T>) =>
              state.selectedRowIds &&
              Object.keys(state.selectedRowIds).length > 0
            }
            variant="left"
          />
        )}
      </Box>
      <Box sx={{ flex: "auto", pl: 4 }}>
        <TextField
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 40,
            },
            "& .MuiOutlinedInput-input": {
              py: 1,
            },
            "& .MuiInputLabel-root": {
              top: -6,
            },
          }}
          label={"search"}
        />
      </Box>
      <Box>
        <ColumnHidePage<T>
          instance={instance}
          onClose={handleClose}
          show={columnsOpen}
          anchorEl={anchorEl}
        />
        <FilterPage<T>
          instance={instance}
          onClose={handleClose}
          show={filterOpen}
          anchorEl={anchorEl}
        />
        {hideableColumns.length > 1 && (
          <SmallIconActionButton
            icon={<ViewColumnsIcon />}
            onClick={handleColumnsClick}
            label="Show / hide columns"
            variant="right"
          />
        )}
        <SmallIconActionButton
          icon={<FilterListIcon />}
          onClick={handleFilterClick}
          label="Filter by columns"
          variant="right"
        />
      </Box>
    </Toolbar>
  );
}
