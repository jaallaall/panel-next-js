import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/CreateOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import FilterListIcon from "@mui/icons-material/FilterList";
import ViewColumnsIcon from "@mui/icons-material/ViewColumn";
import { Button, IconButton, Toolbar, Tooltip } from "@mui/material";
import React, {
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useState,
} from "react";
import { TableInstance } from "react-table";
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
  onClick: MouseEventHandler;
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
}: InstanceActionButton<T>): ReactElement => (
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
}: ActionButton): ReactElement => (
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
}: InstanceActionButton<T>): ReactElement => {
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
}: ActionButton): ReactElement => {
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
}: PropsWithChildren<TableToolbarProps<T>>): ReactElement | null {
  const { columns } = instance;
  const [anchorEl, setAnchorEl] = useState<Element | undefined>(undefined);
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const hideableColumns = columns.filter(
    (column) => !(column.id === "_selector")
  );

  const handleColumnsClick = useCallback(
    (event: MouseEvent) => {
      setAnchorEl(event.currentTarget);
      setColumnsOpen(true);
    },
    [setAnchorEl, setColumnsOpen]
  );

  const handleFilterClick = useCallback(
    (event: MouseEvent) => {
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

  // const handleEddit = () => {
  //   onEdit()
  // }
  // const handleDelete = () => {
  //   onDelete();
  // };

  return (
    <Toolbar sx={{ justifyContent: "space-between" }}>
      <div>
        {onAdd && (
          <InstanceSmallIconActionButton<T>
            instance={instance}
            icon={<AddIcon />}
            onClick={onAdd}
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
      </div>
      <div>
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
      </div>
    </Toolbar>
  );
}
