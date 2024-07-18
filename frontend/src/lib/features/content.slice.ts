import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchOriginalContent, processContent } from "../thunks/content";

import { ContentType } from "@/@types/content";

interface ContentState {
  loading: boolean;
  errOccurred: boolean;
  message: string;
  userId: number | undefined;
  originalContent: ContentType | undefined;
  processedContent: string;
}

const initialState: ContentState = {
  loading: true,
  errOccurred: false,
  message: "",
  userId: undefined,
  originalContent: undefined,
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
          state.originalContent = action.payload;
        }
      )

      .addCase(fetchOriginalContent.rejected, (state, action) => {
        state.errOccurred = true;
        state.loading = false;
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
      });
  },
});

export default Content.reducer;
