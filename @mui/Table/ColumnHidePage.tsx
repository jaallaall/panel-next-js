import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { TableInstance } from "react-table";

type ColumnHidePageProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
  anchorEl?: Element;
  onClose: () => void;
  show: boolean;
};

const id = "popover-column-hide";

export function ColumnHidePage<T extends Record<string, unknown>>({
  instance,
  anchorEl,
  onClose,
  show,
}: ColumnHidePageProps<T>): React.ReactElement | null {
  const { allColumns, toggleHideColumn } = instance;
  const hideableColumns = allColumns.filter(
    (column) => !(column.id === "_selector")
  );
  const checkedCount = hideableColumns.reduce(
    (acc, val) => acc + (val.isVisible ? 0 : 1),
    0
  );

  const onlyOneOptionLeft = checkedCount + 1 >= hideableColumns.length;

  return hideableColumns.length > 1 ? (
    <Popover
      anchorEl={anchorEl}
      sx={{ p: 4 }}
      id={id}
      onClose={onClose}
      open={show}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box sx={{ p: 4 }}>
        <Typography
          sx={{
            fontWeight: 500,
            padding: "0 24px 24px 0",
            textTransform: "uppercase",
          }}
        >
          Visible Columns
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 198px)",
            "@media (max-width: 600px)": {
              gridTemplateColumns: "repeat(1, 160px)",
            },
            gridColumnGap: 6,
            gridRowGap: 6,
          }}
        >
          {hideableColumns.map((column) => (
            <FormControlLabel
              key={column.id}
              control={
                <Checkbox
                  value={`${column.id}`}
                  disabled={column.isVisible && onlyOneOptionLeft}
                />
              }
              label={column.render("Header") as string}
              checked={column.isVisible}
              onChange={() => toggleHideColumn(column.id, column.isVisible)}
            />
          ))}
        </Box>
      </Box>
    </Popover>
  ) : null;
}
