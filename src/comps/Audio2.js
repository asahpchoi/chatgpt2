import { useWhisper } from "@chengsokdara/use-whisper";
import env from "./env.json";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as React from "react";

const Audio2 = ({ setPrompt }) => {
  const [language, setLanguage] = React.useState("en");
  const { transcript, recording, startRecording, stopRecording } = useWhisper({
    apiKey: env.apiKey, // YOUR_OPEN_AI_TOKEN
    streaming: true,
    timeSlice: 1000, // 1 second
    removeSilence: true,
    whisperConfig: {
      language,
    },
  });

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          startRecording();
        }}
      >
        Audio
      </Button>

      <Backdrop
        sx={{
          color: "#fff",
          backgroundColor: "#000",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={recording}
        onClick={() => {}}
      >
        {transcript.text}
        <Button
          variant="outlined"
          onClick={() => {
            stopRecording();
            setPrompt(transcript.text);
          }}
        >
          DONE
        </Button>
      </Backdrop>
    </>
  );
};

export default Audio2;
