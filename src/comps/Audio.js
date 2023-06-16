import * as React from "react";
import { ReactMic } from "react-mic";

export default function AudioInput({ disabled, prompt, setCommands }) {
  const [recording, setRecording] = React.useState(false);
  const onStop = async (blob) => {
    setLoading(true);
    const data = await uploadToWhisper(blob);
    addCard("transcript", data);
    setLoading(false);
  };

  const onData = (blob) => {};
  /*
  const formData = new FormData();
  const audioStream = bufferToStream(audioFile.buffer);
  formData.append("file", audioStream, {
    filename: "audio.mp3",
    contentType: audioFile.mimetype,
  });
  formData.append("model", "whisper-1");
  formData.append("response_format", "json");

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
  const transcription = response.data.text;
  res.json({ transcription });
*/
  return (
    <>
      <ReactMic
        record={recording}
        onStop={onStop}
        onData={onData}
        mimeType="audio/mp3"
      />
    </>
  );
}
