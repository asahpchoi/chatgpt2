import { useWhisper } from "@chengsokdara/use-whisper";
import env from "./env.json";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";

import * as React from "react";
import Fab from "@mui/material/Fab";
import MicIcon from "@mui/icons-material/Mic";

const Audio2 = ({ setPrompt, language }) => {
  const { transcript, recording, startRecording, stopRecording } = useWhisper({
    apiKey: env.apiKey, // YOUR_OPEN_AI_TOKEN
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
        <div>{transcript.text}</div>
        <Fab
          variant="outlined"
          onClick={() => {
            stopRecording();
            setPrompt(transcript.text);
          }}
        >
          <MicIcon />
        </Fab>
      </Backdrop>
    </>
  );
};

export default Audio2;
