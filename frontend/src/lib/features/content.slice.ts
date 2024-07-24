import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchOriginalContent,
  processContent,
  fetchContent,
} from "../thunks/content";
import { toast } from "react-toastify";

import { ContentType } from "@/@types/content";

interface ContentState {
  loading: boolean;
  errOccurred: boolean;
  message: string;
  userId: number | undefined;
  content: ContentType | undefined;
  processedContent: string;
}

const initialState: ContentState = {
  loading: true,
  errOccurred: false,
  message: "",
  userId: undefined,
  content: undefined,
  processedContent: "",
};

const Content = createSlice({
  name: "Content-Operations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOriginalContent.pending, (state) => {
        state.loading = true;
        state.errOccurred = false;
      })
      .addCase(
        fetchOriginalContent.fulfilled,
        (state, action: PayloadAction<ContentType>) => {
          state.loading = false;
          state.content = action.payload;
        }
      )

      .addCase(fetchOriginalContent.rejected, (state, action) => {
        state.errOccurred = true;
        state.loading = false;
        toast.error("an error occurred");
      })
      .addCase(processContent.pending, (state) => {
        state.loading = true;
        state.errOccurred = false;
      })
      .addCase(
        processContent.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.processedContent = action.payload;
        }
      )

      .addCase(processContent.rejected, (state, action) => {
        state.errOccurred = true;
        state.loading = false;
        toast.error("an error occurred");
      })
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
        state.errOccurred = false;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload;
      })

      .addCase(fetchContent.rejected, (state, action) => {
        state.errOccurred = true;
        state.loading = false;
        toast.error("an error occurred");
      });
  },
});

export default Content.reducer;
