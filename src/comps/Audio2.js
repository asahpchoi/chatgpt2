import { useWhisper } from "@chengsokdara/use-whisper";
import env from "./env.json";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";

const Audio2 = ({ setPrompt }) => {
  const { transcript, recording, startRecording, stopRecording } = useWhisper({
    apiKey: env.apiKey, // YOUR_OPEN_AI_TOKEN
    streaming: true,
    timeSlice: 1_000, // 1 second
    whisperConfig: {
      language: "en",
    },
  });
  return (
    <>
      <Button
        onClick={() => {
          startRecording();
        }}
      >
        Audio
      </Button>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={recording}
        onClick={() => {}}
      >
        {transcript.text}
        <Button
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
