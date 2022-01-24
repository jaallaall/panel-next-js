import { useState } from "react";

export const useUploadFile = () => {
  const [fileSelected, setFileSelected] = useState<File | null>(null); // also tried <string | Blob>

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) return;

    setFileSelected(fileList[0]);
  };

  const uploadFile = function (
    e?: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) {
    if (fileSelected) {
      const formData = new FormData();
      formData.append("image", fileSelected, fileSelected.name);
      return formData;
    }
  };
  return { handleImageChange, uploadFile, fileSelected };
};
