import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  uploadDocument,
  fetchDocument,
  getAllDocuments,
} from "../thunks/documents";
import { DocumentsType } from "@/@types/documents";

interface DocumentState {
  loading: boolean;
  errOccurred: boolean;
  message: string;
  userId: number | undefined;
  documents: DocumentsType[];
}

const initialState: DocumentState = {
  loading: true,
  errOccurred: false,
  message: "",
  userId: undefined,
  documents: [],
};

const DocumentsSlice = createSlice({
  name: "Document-Operations",
  initialState,
  reducers: {
    handleLogout(state, action: PayloadAction<string>) {
      //   state.email = action.payload;
    },
  },
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
      });
  },
});
export const { handleLogout } = DocumentsSlice.actions;
export default DocumentsSlice.reducer;
