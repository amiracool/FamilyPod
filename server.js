const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const axios = require("axios");

const app = express();
const upload = multer();

const OPENAI_API_KEY = "sk-...gDMA"; // Replace with your API key

app.use(bodyParser.json());
app.use(express.static("public"));

// Endpoint for processing text
app.post("/generate-chronology", upload.single("file"), async (req, res) => {
  const userInput = req.body.text || "";
  const prompt = `
    Extract a chronology from the following text. Format it in a table with columns: Date, Event, and Analysis.
    ${userInput}
  `;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sk-...gDMA}`,
        },
      }
    );

    const botMessage = response.data.choices[0].message.content;
    res.json({ success: true, output: botMessage });
  } catch (error) {
    console.error(error.response.data);
    res.status(500).json({ success: false, message: "Error generating chronology." });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
