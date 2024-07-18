import fs from "fs";
import path from "path";
import mammoth from "mammoth";
import pdf from "pdf-parse";

const pdfjsLib = async () => {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  return pdfjs;
};

// Function to extract text from a file based on its extension
const extractTextFromFile = async (filePath: string): Promise<string> => {
  const fileExtension = path.extname(filePath).toLowerCase();
  console.log("this is the file extension", fileExtension);
  if (fileExtension === ".txt") {
    return await readTextFile(filePath);
  } else if (fileExtension === ".docx") {
    return await readDocxFile(filePath);
  } else if (fileExtension === ".pdf") {
    return await readPdfFile(filePath);
  } else {
    throw new Error("Unsupported file type");
  }
};

// Function to read text from a .txt file
const readTextFile = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

// Function to read text from a .docx file
const readDocxFile = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) reject(err);
      mammoth
        .extractRawText({ buffer: data })
        .then((result: any) => resolve(result.value))
        .catch(reject);
    });
  });
};

// Function to read text from a .pdf file
const readPdfFile = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) reject(err);
      pdf(data)
        .then((result) => {
          console.log(result);
          resolve(result.text);
        })
        .catch(reject);
    });
  });
};

export default extractTextFromFile;
