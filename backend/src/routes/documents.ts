import { Router } from "express";
import {
  uploadDocument,
  getAllUserDocuments,
  fetchAllContentVersion,
  deleteDocuments,
} from "../controllers/document";
import multer from "multer";
import fs from "fs";
import path from "path";
import isAuth from "../middlewares/isAuth";

const router = Router();

// creating the folder to upload the documents
const uploadsFolderName = "uploads";
const folderPath = path.join(process.cwd(), uploadsFolderName);

if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
  console.log("Folder created successfully");
} else {
  console.log("Folder already exists");
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,

      new Date().toISOString().slice(0, 19).replace("T", " ") +
        "-" +
        file.originalname
    );
  },
});

const upload = multer({ storage: storage });

router.post("/upload", isAuth, upload.single("document"), uploadDocument);
router.get("/", isAuth, getAllUserDocuments);
router.delete("/:id", isAuth, deleteDocuments);
router.get("/versions/:docId", isAuth, fetchAllContentVersion);

export default router;
