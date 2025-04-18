import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

export const enhancePostText = async (req, res) => {
  const { postText } = req.body;
  if (!postText) {
    return res.status(400).json({ error: "Post text is required" });
  }

  try {
    const enhancedText = postText + " Enhance the text. Correct grammar and punctuation. Don't provide any extra information.";
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: enhancedText,
    });

    res.json({ enhancedText: response.text });
  } catch (error) {
    console.error("Error with AI text enhancement:", error);
    res.status(500).json({ error: "Failed to enhance text" });
  }
};
