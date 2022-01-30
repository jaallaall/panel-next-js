import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { FormikProps } from "formik";
import { useRef } from "react";

export const FileUpload: React.FC<{
  name: string;
  label: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileSelected: File | null;
  formik?: FormikProps<any>;
}> = ({
  name,
  label,
  handleImageChange,
  fileSelected,
  formik,
}): React.ReactElement => {
  const ref: any = useRef(null);
  return (
    <Box position="relative">
      <Box>
        <TextField
          name={name}
          fullWidth
          disabled
          label={label}
          value={fileSelected?.name ?? ""}
          onChange={(event: any) =>
            formik?.setFieldValue(name, event.currentTarget.files[0])
          }
          error={formik?.touched[name] && Boolean(formik?.errors[name])}
          helperText={formik?.touched[name] && formik?.errors[name]}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="toggle upload">
                  <CloudUploadIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <ButtonBase
        sx={{
          overflow: "hidden",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        component="label"
        onKeyDown={(e: any) => e.keyCode === 32 && ref.current?.click()}
      >
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />
      </ButtonBase>
    </Box>
  );
};
