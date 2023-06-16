import * as React from "react";
import { ReactMic } from "react-mic";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import env from "./env.json";

export default function AudioInput({ disabled, prompt, setCommands }) {
  const [recording, setRecording] = React.useState(false);

  const onStop = async (blob) => {
    const file = new File([blob.blob], "speech.mp3", { type: "audio/mp3" });

    const url = "https://api.openai.com/v1/audio/transcriptions";

    const form = new FormData();
    form.append("file", file);
    form.append("model", "whisper-1");
    form.append("response_format", "text");

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.apiKey}`,
        "Content-Type": "multipart/form-data",
      },
      body: form,
    };
    console.log({ requestOptions });

    fetch(url, requestOptions);

    /*
  const resp = await axios.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return resp.data.result;
    formData.append("file", audioStream, {
      filename: "audio.mp3",
      contentType: audioFile.mimetype,
    });
    formData.append("model", "whisper-1");
    formData.append("response_format", "json");
    console.log({ formData });
    
    const config = {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    };
    // Call the OpenAI Whisper API to transcribe the audio
    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      config
    );
    */
  };

  const onData = (blob) => {};

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setRecording(true)}>Audio</Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={recording}
        onClick={() => {}}
      >
        <ReactMic
          record={recording}
          onStop={onStop}
          onData={onData}
          mimeType="audio/mp3"
        />
        <Button onClick={() => setRecording(false)}>DONE</Button>
      </Backdrop>
    </>
  );
}
