import { Router } from "express";
import {
  findContent,
  deleteContent,
  saveContent,
  fetchOriginalDocument,
  processContent,
} from "../controllers/content";
import isAuth from "../middlewares/isAuth";

const router = Router();

router.post("/:contId", isAuth, saveContent);
router.delete("/:contId", isAuth, deleteContent);
router.get("/:contId", isAuth, findContent);
router.get("/original/:docId", isAuth, fetchOriginalDocument);
router.post("/:contId/improve", isAuth, processContent);

export default router;
