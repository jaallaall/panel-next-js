import Container from "@mui/material/Container";
import { BoxProps } from "@mui/system";
import Stack from "@mui/material/Stack";

type Props = {
  maxWidth?: false | "xs" | "sm" | "md" | "lg" | "xl";
  containerMiddle?: boolean;
};

export const Section: React.FC<Props & Omit<BoxProps, keyof Props>> = ({
  maxWidth,
  children,
  containerMiddle,
  ...rest
}): React.ReactElement => {
  return (
    <Stack component="section" {...rest}>
      <Container
        maxWidth={maxWidth ?? "sm"}
        sx={{ my: containerMiddle ? "auto" : "" }}
      >
        {children}
      </Container>
    </Stack>
  );
};
