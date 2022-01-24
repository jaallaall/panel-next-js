import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { useCallback } from "react";
import {
  ColumnInstance,
  FilterValue,
  IdType,
  TableInstance,
} from "react-table";

type FilterChipBarProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
};

const getFilterValue = (
  column: ColumnInstance<any>,
  filterValue: FilterValue
) => {
  switch (column.filter) {
    case "between":
      const min = filterValue[0];
      const max = filterValue[1];
      return min ? (max ? `${min}-${max}` : `>=${min}`) : `<=${max}`;
  }
  return filterValue;
};

export function FilterChipBar<T extends Record<string, unknown>>({
  instance,
}: FilterChipBarProps<T>): React.ReactElement | null {
  const {
    allColumns,
    setFilter,
    state: { filters },
  } = instance;
  const handleDelete = useCallback(
    (id: string | number) => {
      setFilter(id as IdType<T>, undefined);
    },
    [setFilter]
  );

  return Object.keys(filters).length > 0 ? (
    <Box sx={{ padding: "18px 0 5px 10px", width: "100%" }}>
      <Typography
        component="span"
        sx={{ color: "#998", fontSize: "14px", paddingRight: 10 }}
      >
        Active filters:
      </Typography>
      {filters &&
        allColumns.map((column) => {
          const filter = filters.find((f) => f.id === column.id);
          const value = filter && filter.value;
          return (
            value && (
              <Chip
                sx={{ marginRight: 4, color: "#222" }}
                key={column.id}
                label={
                  <>
                    <Typography
                      component="span"
                      sx={{ fontWeight: 500, marginRight: 5 }}
                    >
                      {column.render("Header")}:{" "}
                    </Typography>
                    {getFilterValue(column, value)}
                  </>
                }
                onDelete={() => handleDelete(column.id)}
                variant="outlined"
              />
            )
          );
        })}
    </Box>
  ) : null;
}
