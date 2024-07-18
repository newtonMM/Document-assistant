import { Router } from "express";
import {
  findContent,
  deleteContent,
  updateContent,
  fetchOriginalDocument,
  processContent,
} from "../controllers/content";
import isAuth from "../middlwares/isAuth";

const router = Router();

router.put("/:contId", isAuth, updateContent);
router.delete("/:contId", isAuth, deleteContent);
router.get("/:contId", isAuth, findContent);
router.get("/original/:docId", isAuth, fetchOriginalDocument);
router.post("/:contId/improve", isAuth, processContent);

export default router;
