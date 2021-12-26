import { Box, Dialog, AskDialog, DataGrid } from "@mui";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useModal } from "hooks";
import { mainUs } from "i18n";
import { Options } from "interfaces";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { useUserAll, useUserDelete } from "services";
import ActionsGrid from "./ActionGrid";
import UserCreate from "./UserCreate";

export type Person = {
  message: string;
  message_count: string;
  admin_accept: boolean;
  gender: string;
  city: string;
  number: number;
  total_cost: string;
};

type PersonData = Person & {
  subRows?: PersonData[] | undefined;
};

const UserAll: React.FC = (): React.ReactElement => {
  const queryClient = useQueryClient();
  const { data: dataUserAll } = useUserAll();
  const { mutate } = useUserDelete();

  const [onSelectedRows, setOnSelectedRows] = useState<Options[]>([]);
  const [skipPageReset, setSkipPageReset] = useState(false);

  const { isShowing, toggle } = useModal();
  const { isShowing: isShowingDelete, toggle: toggleDelete } = useModal();
  const [dataRow, setDataRow] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    setSkipPageReset(false);
  }, [dataUserAll]);

  const rowDelete = () => {
    // toggleDelete();
    mutate(dataRow.id, {
      onSuccess: () => {
        queryClient.invalidateQueries("userAll");
        toggleDelete();
      },
    });
  };

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

  const updateMyData = (rowIndex: any, columnId: any, value: any) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
  };

  const data = useMemo(() => {
    return dataUserAll ? dataUserAll : [];
  }, [dataUserAll]);

  const handleDeleteAll = () => {
    onSelectedRows?.map((item) =>
      mutate(item.original.id, {
        onSuccess: () => {
          queryClient.invalidateQueries("userAll");
        },
      })
    );
  };

  return (
    <>
      <DataGrid name={"testTable"} columns={columns} data={data} />
      <Dialog
        title={dataRow.userFullName}
        handleClickOpen={toggle}
        open={isShowing}
      >
        <UserCreate dataRow={dataRow} toggle={toggle} />
      </Dialog>
      <AskDialog
        open={isShowingDelete}
        handleClickOpen={rowDelete}
        handleCloseModal={toggleDelete}
      />
    </>
  );
};

export default UserAll;
