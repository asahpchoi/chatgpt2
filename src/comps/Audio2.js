import { useWhisper } from "@chengsokdara/use-whisper";
import env from "./env.json";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import LinearProgress from "@mui/material/LinearProgress";
import * as React from "react";
import Fab from "@mui/material/Fab";
import MicIcon from "@mui/icons-material/Mic";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";

const Audio2 = ({ setPrompt, language }) => {
  const { transcript, recording, startRecording, stopRecording } = useWhisper({
    apiKey: env.apiKey1 + env.apiKey2, // YOUR_OPEN_AI_TOKEN
    streaming: true,
    timeSlice: 5000, // 1 second
    removeSilence: true,
    whisperConfig: {
      language,
    },
  });

  return (
    <>
      <Fab
        onClick={() => {
          startRecording();
        }}
      >
        <MicIcon />
      </Fab>

      <Backdrop
        sx={{
          color: "#fff",
          backgroundColor: "#000",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={recording}
        onClick={() => {}}
      >
        <Card fullWidth>
          <CardContent fullWidth>
            <Typography
              sx={{ fontSize: 14, width: "100vw", padding: "1em" }}
              color="text.secondary"
            >
              {transcript.text}
            </Typography>
          </CardContent>
          <CardActions
            style={{ display: "flex", "justify-content": "space-between" }}
          >
            <Box sx={{ width: "80%" }}>
              <LinearProgress color="secondary" />
            </Box>
            <Fab
              variant="outlined"
              onClick={() => {
                stopRecording();
                setPrompt(transcript.text);
              }}
            >
              <SendIcon />
            </Fab>
          </CardActions>
        </Card>
      </Backdrop>
    </>
  );
};

export default Audio2;
