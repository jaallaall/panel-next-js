import { Button, FileUpload, Input } from "@mui";
import Stack from "@mui/material/Stack";
import { useFormik } from "formik";
import { useUploadFile } from "hooks";
import { Dic, Options } from "interfaces";
import { useTranslation } from "next-i18next";
import { useRef, useState } from "react";
import { countries, top100Films, validationSchemaTest } from "utils";
import { GridForm } from "./GridForm";

const Forms: React.FC = (): React.ReactElement => {
  const { t } = useTranslation("common");
  const [data, setData] = useState<Options[]>([]);
  const myRef: any = useRef(null);

  const { handleImageChange, fileSelected, uploadFile } = useUploadFile();

  const executeScroll = () =>
    myRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });

  const formik = useFormik({
    initialValues: {
      name: "",
      gender: "male",
      countries: { code: "AD", label: "Andorra", phone: "376" },
      countries1: [{ code: "AD", label: "Andorra", phone: "376" }],
      birthDate: new Date(),
      film: "The Shawshank Redemption",
      file: "",
    },
    validationSchema: validationSchemaTest,
    onSubmit: (values, { resetForm }) => {
      setData([...data, values]);

      resetForm();
      executeScroll();
    },
  });

  const handleDelete = (item: Options) => {
    setData(data.filter((itm) => itm.name !== item.name));
  };

  return (
    <>
      <Stack
        component="form"
        onSubmit={formik.handleSubmit}
        spacing={2}
        sx={{
          bgcolor: "grey",
          p: 2,
          border: "1px solid #ddd",
          maxWidth: 600,
          mx: "auto",
          width: "100%",
          borderRadius: 2,
        }}
      >
        <Input name="name" formik={formik} label={t(Dic.name)} />
        <Input
          mode="autocomplete"
          options={countries}
          titleBased="label"
          formik={formik}
          name="countries"
          label={t(Dic.countries)}
          render={({ label }) => <span>{label}</span>}
        />
        <Input
          mode="autocomplete"
          options={countries}
          titleBased="label"
          formik={formik}
          multiple
          name="countries1"
          label={t(Dic.countries)}
          render={({ label }) => <span>{label}</span>}
        />
        <Input
          mode="select"
          name={t(Dic.film)}
          options={top100Films}
          titleBased="label"
          formik={formik}
        />
        <Input mode="gender" name="gender" formik={formik} />
        <Input
          mode="datePicker"
          name="birthDate"
          formik={formik}
          label={t(Dic.birthDate)}
        />
        <FileUpload
          fileSelected={fileSelected}
          handleImageChange={handleImageChange}
          label="upload image"
          name={t(Dic.file)}
          formik={formik}
        />
        <Button type="submit">submit</Button>
      </Stack>
      <GridForm data={data} handleDelete={handleDelete} ref={myRef} />
    </>
  );
};

export default Forms;
