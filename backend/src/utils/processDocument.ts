import { GoogleGenerativeAI } from "@google/generative-ai";

/* accepts the text we extracted then we prompt gemini AI to identify and correct errors  */

export const processDocument = async (content: string) => {
  try {
    if (!process.env.GEMMA_API_KEY) {
      const error = new Error("missing API key");
      throw error;
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMMA_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt =
      "You are a document editor. Identify errors and suggest improvements. the output should be in markdown format";

    const result = await model.generateContent([prompt, content]);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error processing file:", error);
  }
};
