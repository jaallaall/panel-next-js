import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const CircularProgressCustom: React.FC<{
  loading?: boolean;
  height?: React.CSSProperties;
}> = ({ loading, height, children }): React.ReactElement => {
  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: height ?? 250,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        children
      )}
    </>
  );
};
