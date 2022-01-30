import {
  AskDialog,
  Button,
  DataGrid,
  DatePickerFilter,
  Dialog,
  SliderColumnFilter,
} from "@mui";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useModal } from "hooks";
import { Options, Dic } from "interfaces";
import { useTranslation } from "next-i18next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { TableInstance } from "react-table";
import { useUserAll, useUserDelete } from "services";
import UserCreate from "./UserCreate";

const UserAll: React.FC = (): React.ReactElement => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { data: dataUserAll } = useUserAll();
  const { mutate } = useUserDelete();
  const [createUser, setCreateUser] = useState<boolean>(false);
  const [dataRow, setDataRow] = useState<Options>({});
  const [dataRowAll, setDataRowAlll] = useState<Options[]>([]);

  const { isShowing, toggle } = useModal();
  const { isShowing: isShowingDelete, toggle: toggleDelete } = useModal();
  const { isShowing: isShowingAdd, toggle: toggleAdd } = useModal();

  const columns = useMemo(
    () => [
      {
        Header: t(Dic.message),
        accessor: "message",
      },
      {
        Header: t(Dic.message_count),
        accessor: "message_count",
        Filter: DatePickerFilter,
      },
      {
        Header: t(Dic.admin_accept),
        accessor: "admin_accept",
        Cell: ({ row: { original } }: { row: { original: Options } }) => {
          if (original.admin_accept) {
            return <CheckBoxIcon />;
          }
          return <CancelIcon color="error" />;
        },
      },
      {
        Header: t(Dic.gender),
        accessor: "gender",
        Cell: ({ row: { original } }: { row: { original: Options } }) => {
          return <>{original.query_param.gender}</>;
        },
      },
      {
        Header: t(Dic.city),
        accessor: "city",
        Cell: ({ row: { original } }: { row: { original: Options } }) => {
          return <>{original.query_param.city}</>;
        },
      },
      {
        Header: t(Dic.number),
        accessor: "number",
        Filter: SliderColumnFilter,
      },
      {
        Header: t(Dic.total_cost),
        accessor: "total_cost",
      },
    ],
    []
  );

  useEffect(() => {
    if (!isShowingAdd) setCreateUser(false);
  }, [isShowingAdd]);

  const data = useMemo(() => (dataUserAll ? dataUserAll : []), [dataUserAll]);

  const dummy = useCallback(
    (instance: TableInstance<any>, e?: "edit" | "delete" | "add") => () => {
      const del = instance.selectedFlatRows.map((item) => item.original);
      setDataRowAlll(del);
      if (e === "delete") {
        toggleDelete();
      }
      if (e === "edit") {
        toggle();
      }
      if (e === "add") {
        setCreateUser(true);
        toggleAdd();
      }
    },
    [toggle, toggleDelete, toggleAdd]
  );

  const rowDelete = () => {
    mutate(dataRow.id, {
      onSuccess: () => {
        toggleDelete();
        queryClient.invalidateQueries("userAll");
      },
    });
  };

  const handleDeleteAll = () =>
    dataRowAll?.forEach(({ id }) => {
      mutate(id, {
        onSuccess: () => {
          toggleDelete();
          queryClient.invalidateQueries("userAll");
        },
      });
    });

  return (
    <>
      <DataGrid
        name={"testTable"}
        columns={columns}
        data={data}
        onAdd={dummy}
        onEdit={dummy}
        onDelete={dummy}
        setDataRow={setDataRow}
        toggleDelete={() => toggleDelete()}
        handleClickEddit={() => toggle()}
        sizePage={2}
      />
      <Dialog
        title={dataRow.message}
        handleClickOpen={toggle}
        open={isShowing}
        dialogActions={
          <Button
            type="submit"
            // loading={loading}
            form="form"
            sx={{ width: "100%" }}
          >
            edit
          </Button>
        }
      >
        <UserCreate
          dataRow={dataRowAll.length > 0 ? dataRowAll[0] : dataRow}
          toggle={toggle}
          createUser={createUser}
        />
      </Dialog>
      <Dialog
        title="add"
        handleClickOpen={toggleAdd}
        open={isShowingAdd}
        dialogActions={
          <Button
            type="submit"
            // loading={isLoading}
            form="form"
            sx={{ width: "100%" }}
          >
            create
          </Button>
        }
      >
        <UserCreate toggleAdd={toggleAdd} createUser={createUser} />
      </Dialog>
      <AskDialog
        open={isShowingDelete}
        handleClickOpen={dataRowAll.length > 0 ? handleDeleteAll : rowDelete}
        handleCloseModal={toggleDelete}
      />
    </>
  );
};

export default UserAll;
