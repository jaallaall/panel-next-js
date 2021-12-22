import { useUserAll } from "services";
import { DataGrid } from "@mui";
import { useMemo, useState } from "react";
import ActionsGrid from "./ActionGrid";
import { mainUs } from "i18n";
import { Options } from "interfaces";
import { useModal } from "hooks";

const UserAll: React.FC = (): React.ReactElement => {
  const [onSelectedRows, setOnSelectedRows] = useState<Options[]>([]);
  const [skipPageReset, setSkipPageReset] = useState(false);

  const { data: dataUserAll } = useUserAll();
  const { isShowing, toggle } = useModal();
  const [dataRow, setDataRow] = useState<{ [key: string]: any }>({});

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
            return "active";
          }
          return "deactive";
        },
      },
      {
        id: "details",
        Cell: ({ row: { original } }: { row: { original: Options } }) => (
          <ActionsGrid
            setDataRow={setDataRow}
            original={original}
            toggle={toggle}
            // toggleDelete={() => {
            //   toggleDelete();
            //   setDataRow(original);
            // }}
            // handleClickEddit={() => {
            //   toggleEddit();
            //   setDataRow(original);
            // }}
          />
        ),
      },
    ],
    []
  );

  const data = useMemo(() => {
    return dataUserAll ? dataUserAll : [];
  }, [dataUserAll]);

  const updateMyData = (rowIndex: number, columnId: string, value: unknown) => {
    setSkipPageReset(true);
  };

  console.log(dataUserAll);
  return (
    <DataGrid
      columns={columns}
      data={data}
      onSelectedRows={setOnSelectedRows}
      updateMyData={updateMyData}
    />
  );
};

export default UserAll;
