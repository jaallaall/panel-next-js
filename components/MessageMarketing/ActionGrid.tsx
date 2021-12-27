import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { Options, SxPropes } from "interfaces";

const styles: SxPropes = {
  px: 0,
  minWidth: 40,
};

const ActionsGrid: React.FC<{
  setDataRow?: (e: any) => void;
  // toggle: () => void;
  original?: Options;
  toggleDelete?: (e?: any) => void;
  handleClickEddit?: (e?: any) => void;
}> = ({
  setDataRow,
  // toggle,
  original,
  toggleDelete,
  handleClickEddit,
}): React.ReactElement => {
  return (
    <Stack flexDirection="row" justifyContent="flex-end">
      {/* <IconButton
        onClick={() => {
          setDataRow({
            ...original,
            fromDate: new Date(original.fromDate).toLocaleDateString("fa-IR"),
            toDate: new Date(original.toDate).toLocaleDateString("fa-IR"),
          });
          toggle();
        }}
        size="small"
        sx={styles}
      >
        <RemoveRedEyeIcon />
      </IconButton> */}
      <IconButton sx={styles} onClick={handleClickEddit}>
        <EditIcon />
      </IconButton>
      <IconButton sx={styles} onClick={toggleDelete}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};

export default ActionsGrid;
