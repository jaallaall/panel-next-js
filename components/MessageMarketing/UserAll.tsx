import { AskDialog, Button, DataGrid, Dialog } from "@mui";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useModal } from "hooks";
import { mainUs } from "i18n";
import { Options } from "interfaces";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { TableInstance } from "react-table";
import { useUserAll, useUserDelete } from "services";
import UserCreate from "./UserCreate";

const UserAll: React.FC = (): React.ReactElement => {
  const queryClient = useQueryClient();
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
        Header: mainUs.message,
        accessor: "message",
      },
      {
        Header: mainUs.message_count,
        accessor: "message_count",
      },
      {
        Header: mainUs.admin_accept,
        accessor: "admin_accept",
        Cell: ({ row: { original } }: { row: { original: Options } }) => {
          if (original.admin_accept) {
            return <CheckBoxIcon />;
          }
          return <CancelIcon color="error" />;
        },
      },
      {
        Header: mainUs.gender,
        accessor: "gender",
        Cell: ({ row: { original } }: { row: { original: Options } }) => {
          return <>{original.query_param.gender}</>;
        },
      },
      {
        Header: mainUs.city,
        accessor: "city",
        Cell: ({ row: { original } }: { row: { original: Options } }) => {
          return <>{original.query_param.city}</>;
        },
      },
      {
        Header: mainUs.number,
        accessor: "number",
      },
      {
        Header: mainUs.total_cost,
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
        title={dataRow.message}
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
