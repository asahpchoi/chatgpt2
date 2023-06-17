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
import Fab from "@mui/material/Fab";
import Actions from "./comps/Actions";
import AudioInput from "./comps/Audio";
import Audio2 from "./comps/Audio2";
import ChatAgent from "./comps/ChatAgent";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const Topbar = ({ language, setLanguage }) => {
  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Chat
        </Typography>

        <RadioGroup value={language} onChange={handleChange} row>
          <FormControlLabel value="en" control={<Radio />} label="English" />
          <FormControlLabel value="zh" control={<Radio />} label="Chinese" />
        </RadioGroup>
      </Toolbar>
    </AppBar>
  );
};

const ChatbotApp = () => {
  const [prompt, setPrompt] = useState("");
  const [gptResponse, setGptResponse] = useState("");
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en");

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
      <Topbar language={language} setLanguage={setLanguage} />
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
        <div>
          <TextField
            multiline
            rows={1}
            onChange={(e) => setPrompt(e.target.value)}
            style={{ width: "70vw" }}
            value={prompt}
            label="Ask GPT"
          />
          <Audio2 setPrompt={setPrompt} language={language} />
        </div>
        <div>
          <Button
            onClick={async () => {
              setLoading(true);
              setPrompt("");
              const response = await ChatAgent(
                prompt,
                setGptResponse,
                memories
              );
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
        </div>
      </Paper>
    </Box>
  );
};

export default ChatbotApp;
