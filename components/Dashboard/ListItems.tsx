import { ExpandMore } from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Collapse, ListItemButton } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { Link } from "@mui";

const ListItems: React.FC<{
  subMenu?: { [key: string]: any }[];
  name?: string;
  openDrawer?: boolean;
  subName?: string;
  icon?: React.ReactElement;
  href: string;
}> = ({
  name,
  subMenu,
  icon,
  openDrawer,
  subName,
  href,
}): React.ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const list = subMenu ? subMenu : [];
  return (
    <>
      <ListItemButton
        onClick={list?.length > 0 && openDrawer ? handleClick : undefined}
        sx={list?.length > 0 && openDrawer ? null : { py: 1.5 }}
        component={!subMenu?.length ? Link : ListItemButton}
        href={`/${href}`}
      >
        {icon}
        {openDrawer && (
          <>
            <ListItemText primary={name} />
            {list?.length > 0 && openDrawer ? (
              open ? (
                <ExpandMore fontSize="small" />
              ) : (
                <ChevronRightIcon fontSize="small" />
              )
            ) : null}
          </>
        )}
      </ListItemButton>
      {list?.length > 0 && openDrawer && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {list?.map((item, i) => {
            return (
              <Link
                href={`/${href}/${item.href}`}
                key={i}
                sx={{ px: 2, py: 1, color: "inherit", display: "block" }}
              >
                {subName ? item[subName] : ""}
              </Link>
            );
          })}
        </Collapse>
      )}
    </>
  );
};

export default ListItems;
