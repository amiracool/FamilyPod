const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const fileInput = document.getElementById("file-input");
const sendButton = document.getElementById("send-button");

// Replace this with your API key
const API_KEY = "sk-...gDMA"; // Replace with your actual API key

async function sendMessage() {
  const userText = userInput.value.trim();

  if (!userText && !fileInput.files.length) {
    alert("Please provide input text or upload a file.");
    return;
  }

  appendMessage("You", userText || "File uploaded...");

  let extractedText = userText;
  if (fileInput.files.length) {
    extractedText = await extractTextFromFile(fileInput.files[0]);
  }

  const prompt = `
    Extract a chronology from the following text. Format it as:
    - Column 1: Date
    - Column 2: Event
    - Column 3: Analysis.
    ${extractedText}
  `;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  const botMessage = data.choices[0].message.content;

  appendMessage("Assistant", botMessage);
  createDownloadButton(botMessage);
}

function appendMessage(sender, message) {
  const messageElement = document.createElement("p");
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function extractTextFromFile(file) {
  if (file.type === "text/plain") {
    return await file.text();
  } else {
    alert("Only plain text files are supported for now.");
    return "";
  }
}

function createDownloadButton(content) {
  const button = document.createElement("button");
  button.textContent = "Download Chronology";
  button.onclick = () => downloadAsWord(content);
  chatBox.appendChild(button);
}

function downloadAsWord(content) {
  const blob = new Blob([content], { type: "application/msword" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Chronology.doc";
  link.click();
}

sendButton.addEventListener("click", sendMessage);
