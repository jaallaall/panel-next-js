import Stack, { StackProps } from "@mui/material/Stack";
import { forwardRef } from "react";

// type numbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface Break {
  lg?: number;
  md?: number;
  xs?: number;
}

export const GridItem: React.FC<
  {
    span?: number;
  } & StackProps
> = ({ span, children, ...rest }): React.ReactElement => {
  return (
    <Stack
      gridColumn={span ? `span ${span} / span ${span}` : undefined}
      {...rest}
    >
      {children}
    </Stack>
  );
};

function GridRef(
  {
    cols,
    gap,
    children,
    ...rest
  }: {
    cols?: number | Break;
    gap?: number;
  } & StackProps,
  ref?: React.ForwardedRef<HTMLDivElement>
): React.ReactElement {
  let col;
  if (typeof cols === "number") {
    col = `repeat(${cols as number}, minmax(0,1fr))`;
  } else {
    col = {
      lg: cols?.lg ? `repeat(${cols.lg}, minmax(0,1fr))` : "",
      md: cols?.md ? `repeat(${cols.md}, minmax(0,1fr))` : "",
      xs: cols?.xs ? `repeat(${cols.xs}, minmax(0,1fr))` : "",
    };
  }
  return (
    <Stack
      display="grid"
      gridTemplateColumns={col}
      gap={gap}
      {...rest}
      ref={ref}
    >
      {children}
    </Stack>
  );
}

export const GridCustom = forwardRef(GridRef);
