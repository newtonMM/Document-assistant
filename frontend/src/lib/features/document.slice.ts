import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  uploadDocument,
  fetchDocument,
  getAllDocuments,
} from "../thunks/documents";
import { DocumentsType } from "@/@types/documents";
import { toast } from "react-toastify";

interface DocumentState {
  loading: boolean;
  errOccurred: boolean;
  message: string;

  documents: DocumentsType[];
}

const initialState: DocumentState = {
  loading: true,
  errOccurred: false,
  message: "",
  documents: [],
};

const DocumentsSlice = createSlice({
  name: "Document-Operations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadDocument.pending, (state) => {
        state.loading = true;
        state.errOccurred = false;
      })
      .addCase(uploadDocument.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.errOccurred = true;
        state.loading = false;
        toast.error("an error occurred");
      })
      .addCase(getAllDocuments.pending, (state) => {
        state.loading = true;
        state.errOccurred = false;
      })
      .addCase(
        getAllDocuments.fulfilled,
        (state, action: PayloadAction<DocumentsType[]>) => {
          state.loading = false;
          state.documents = action.payload;
        }
      )

      .addCase(getAllDocuments.rejected, (state, action) => {
        state.errOccurred = true;
        state.loading = false;
        toast.error("an error occurred");
      });
  },
});

export default DocumentsSlice.reducer;
