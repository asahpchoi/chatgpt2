import env from "./env.json";

async function ChatAgent(input, setOutput, memories) {
  memories.push({ role: "user", content: input });
  const messages = memories;
  const apiKey = env.apiKey1 + env.apiKey2;

  let data = "";
  try {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const decoder = new TextDecoder("utf-8");

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-16k",
        messages,
        stream: true, // For streaming responses
      }),
    });

    const reader = response.body.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const dl = decoder.decode(value);
      const ls = dl.split("\n");

      const parsedLines = ls
        .map((l) => l.replace(/^data: /, "").trim())
        .filter((l) => l !== "" && l !== "[DONE]")
        .map((l) => JSON.parse(l).choices[0].delta.content);
      data = data + parsedLines.join(" ");
      setOutput(data);
    }
  } catch (e) {
    console.log(e);
  }
  return data;
}

export default ChatAgent;
