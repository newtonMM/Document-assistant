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

    const prompt = `This is a piece of text extracted from a file. Please analyze it a generate an improved version fixing grammatical errors and spelling .Please format your response as markdown so that I can convert the output to html. `;

    /* 
    
    
    
    */
    const result = await model.generateContent([prompt, content]);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error processing file:", error);
  }
};
