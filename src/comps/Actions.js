import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";

const { Client } = require("@notionhq/client");
const token = "secret_JUsbKVd6EB0zgqwe1gWo4SmThx5Q9Jo2CFT4YP0Oi3f";

export default function Actions({ disabled, prompt, setCommands }) {
  const [templates, setTemplates] = React.useState([]);

  async function init() {
    const result = await (
      await fetch("https://4q8slb-3000.csb.app/getMessageTemplates")
    ).json();
    //console.log({ result });
    setTemplates(result);
  }

  React.useEffect(() => {
    init();
  }, []);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
    >
      <List>
        {templates.map(({ title, format, instruction }, index) => {
          const newPrompt = instruction.replace("${text}", prompt);
          return (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => {
                  setCommands(newPrompt, format);
                }}
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      <Button
        onClick={toggleDrawer("bottom", true)}
        variant="outlined"
        disabled={disabled}
      >
        Prompts {process.env.API_URL}
      </Button>
      <Drawer
        anchor="bottom"
        open={state["bottom"]}
        onClose={toggleDrawer("bottom", false)}
      >
        {list("bottom")}
      </Drawer>
    </>
  );
}
