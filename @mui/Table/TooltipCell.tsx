import { Tooltip as MuiTooltip } from "@mui/material";
import { CellProps } from "react-table";

export const TooltipCellRenderer: React.FC<CellProps<any>> = ({
  cell: { value },
  column: { align = "left" },
}) => <TooltipCell text={value} align={align} />;

interface TooltipProps {
  text: string;
  tooltip?: string;
  align: string;
}

export const TooltipCell: React.FC<TooltipProps> = ({
  text,
  tooltip = text,
  align,
}) => {
  return (
    <MuiTooltip
      title={tooltip}
      sx={{
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
      style={{ textAlign: align } as React.CSSProperties}
    >
      <span>{text}</span>
    </MuiTooltip>
  );
};
