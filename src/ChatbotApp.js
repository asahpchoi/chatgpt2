import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import "animate.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ReactJson from "react-json-view";

import Actions from "./comps/Actions";
import AudioInput from "./comps/Audio";
import ChatAgent from "./comps/ChatAgent";

const ChatbotApp = () => {
  const [prompt, setPrompt] = useState("");
  const [gptResponse, setGptResponse] = useState("");
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(false);

  async function setCommands(userPrompt, systemPrompt) {
    console.log({ userPrompt, systemPrompt });
    setLoading(true);
    setPrompt("");
    memories.push({ role: "system", content: systemPrompt });
    const response = await ChatAgent(userPrompt, setGptResponse, memories);
    memories.push({ role: "system", content: response });
    setMemories(memories);
    setGptResponse("");
    setLoading(false);
  }

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        overflowX: "none",
      }}
    >
      <CssBaseline />
      <List style={{ height: "85vh", overflow: "none" }}>
        {memories.map(({ role, content }, index) => {
          let json = null;
          try {
            json = JSON.parse(content);
          } catch (e) {
            json = null;
          }

          return (
            <>
              <ListItem
                button
                key={index}
                style={{
                  backgroundColor: role === "system" ? "#EEFFEE" : "#FFEEEE",
                }}
              >
                {!json ? (
                  <ListItemText primary={content} />
                ) : (
                  <ReactJson src={json} />
                )}
              </ListItem>
              <Divider key={index + "D"} />
            </>
          );
        })}

        {gptResponse && (
          <>
            <ListItem
              button
              className="messageBox "
              key="templist"
              style={{
                backgroundColor: "#EEFFEE",
              }}
            >
              <ListItemText primary={gptResponse} />
            </ListItem>
            <Divider key="tempD" />
          </>
        )}
      </List>

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        className="toolbar"
        elevation={3}
      >
        <TextField
          multiline
          rows={1}
          onChange={(e) => setPrompt(e.target.value)}
          fullWidth
          value={prompt}
          label="Ask GPT"
        />
        <Button
          onClick={async () => {
            setLoading(true);
            setPrompt("");
            const response = await ChatAgent(prompt, setGptResponse, memories);
            memories.push({ role: "system", content: response });
            setMemories(memories);
            setGptResponse("");
            setLoading(false);
          }}
          variant="outlined"
          disabled={loading || !prompt}
        >
          Send
        </Button>

        <Actions
          disabled={loading || !prompt}
          prompt={prompt}
          setCommands={setCommands}
        />
      </Paper>
    </Box>
  );
};

export default ChatbotApp;
