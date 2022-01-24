import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useMemo } from "react";
import { FilterProps, IdType, Row } from "react-table";

const getMinMax = (rows: Row<any>[], id: IdType<any>) => {
  let min = rows.length ? rows[0].values[id] : 0;
  let max = rows.length ? rows[0].values[id] : 0;
  rows.forEach((row) => {
    min = Math.min(row.values[id], min);
    max = Math.max(row.values[id], max);
  });
  return [min, max];
};

export function SliderColumnFilter({
  column: { render, filterValue, setFilter, preFilteredRows, id },
}: FilterProps<any>) {
  const [min, max] = useMemo(
    () => getMinMax(preFilteredRows, id),
    [id, preFilteredRows]
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
    >
      <TextField
        name={id}
        label={render("Header")}
        type="range"
        inputProps={{
          min,
          max,
        }}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10));
        }}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            p: ({ spacing }) => spacing(0, 1.3),
          },
          "& .MuiOutlinedInput-input": {
            p: 2,
          },
        }}
      />
      {/* <Button
        variant="outlined"
        style={{ width: 60, height: 36 }}
        onClick={() => setFilter(undefined)}
      >
        Off
      </Button> */}
    </div>
  );
}
