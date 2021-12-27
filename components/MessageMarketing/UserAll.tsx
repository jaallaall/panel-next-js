import { AskDialog, Box, DataGrid, Dialog } from "@mui";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useModal } from "hooks";
import { mainUs } from "i18n";
import { Options } from "interfaces";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { TableInstance } from "react-table";
import { useUserAll, useUserDelete } from "services";
import ActionsGrid from "./ActionGrid";
import UserCreate from "./UserCreate";

const UserAll: React.FC = (): React.ReactElement => {
  const queryClient = useQueryClient();
  const { data: dataUserAll } = useUserAll();
  const { mutate } = useUserDelete();
  const [skipPageReset, setSkipPageReset] = useState(false);

  const { isShowing, toggle } = useModal();
  const { isShowing: isShowingDelete, toggle: toggleDelete } = useModal();
  const [dataRow, setDataRow] = useState<Options>({});
  const [dataRowAll, setDataRowAlll] = useState<Options[]>([]);

  useEffect(() => {
    setSkipPageReset(false);
  }, [dataUserAll]);

  const columns = useMemo(
    () => [
      {
        Header: mainUs.message,
        accessor: "message",
        Filter: "",
      },
      {
        Header: mainUs.message_count,
        accessor: "message_count",
        Filter: "",
      },
      {
        Header: mainUs.admin_accept,
        accessor: "admin_accept",
        Filter: "",
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
        Filter: "",
        Cell: ({ row: { original } }: { row: { original: Options } }) => {
          return <Box>{original.query_param.gender}</Box>;
        },
      },
      {
        Header: mainUs.city,
        accessor: "city",
        Filter: "",
        Cell: ({ row: { original } }: { row: { original: Options } }) => {
          return <Box>{original.query_param.city}</Box>;
        },
      },
      {
        Header: mainUs.number,
        accessor: "number",
        Filter: "",
      },
      {
        Header: mainUs.total_cost,
        accessor: "total_cost",
        Filter: "",
      },
      {
        id: "details",
        Cell: ({ row: { original } }: { row: { original: Options } }) => (
          <ActionsGrid
            setDataRow={setDataRow}
            original={original}
            // toggle={toggle}
            toggleDelete={() => {
              toggleDelete();
              setDataRow(original);
            }}
            handleClickEddit={() => {
              toggle();
              setDataRow(original);
            }}
          />
        ),
      },
    ],
    []
  );

  const data = useMemo(() => {
    return dataUserAll ? dataUserAll : [];
  }, [dataUserAll]);

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
    },
    [toggle, toggleDelete]
  );

  const rowDelete = () => {
    mutate(dataRow.id, {
      onSuccess: () => {
        toggleDelete();
        queryClient.invalidateQueries("userAll");
      },
    });
  };

  const handleDeleteAll = () => {
    return dataRowAll?.forEach(({ id }) => {
      mutate(id, {
        onSuccess: () => {
          toggleDelete();
          queryClient.invalidateQueries("userAll");
        },
      });
    });
  };

  return (
    <>
      <DataGrid
        name={"testTable"}
        columns={columns}
        data={data}
        onAdd={dummy}
        onEdit={dummy}
        onDelete={dummy}
      />
      <Dialog title={dataRow.message} handleClickOpen={toggle} open={isShowing}>
        <UserCreate
          dataRow={dataRowAll.length > 0 ? dataRowAll[0] : dataRow}
          toggle={toggle}
        />
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
