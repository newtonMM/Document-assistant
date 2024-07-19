import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { DocumentsType } from "@/@types/documents";

const baseUrl = import.meta.env.VITE_API_URL;

export const getAllDocuments = createAsyncThunk<
  DocumentsType[],
  void,
  { state: RootState; rejectValue: string }
>("fetch-all-documents-service", async (_, thunkAPI) => {
  const abortController = new AbortController();

  const response = await fetch(`${baseUrl}/documents`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    var respDetails = await response.json();
    abortController.abort();
    return thunkAPI.rejectWithValue(respDetails.message);
  }
  const data = await response.json();
  if (!data) {
    abortController.abort();
    return thunkAPI.rejectWithValue("empty response ");
  }
  console.log("this is the data", data);
  return data.documents;
});

export const deleteDocument = createAsyncThunk<
  string,
  number,
  { state: RootState; rejectValue: string }
>("document-delete-service", async (doc_id, thunkAPI) => {
  const abortController = new AbortController();

  const response = await fetch(`${baseUrl}/documents/${doc_id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    var respDetails = await response.json();
    abortController.abort();
    return thunkAPI.rejectWithValue(respDetails.message);
  }
  const data = await response.json();
  if (!data) {
    abortController.abort();
    return thunkAPI.rejectWithValue("empty response ");
  }

  return data;
});

export const fetchDocument = createAsyncThunk<
  string,
  number,
  { state: RootState; rejectValue: string }
>("get-a document-service", async (payload, thunkAPI) => {
  const abortController = new AbortController();

  const response = await fetch(`${baseUrl}/documents/doc_id`, {
    method: "GET",
    body: JSON.stringify(payload),
    credentials: "include",
  });
  if (!response.ok) {
    var respDetails = await response.json();
    abortController.abort();
    return thunkAPI.rejectWithValue(respDetails.message);
  }
  const data = await response.json();
  if (!data) {
    abortController.abort();
    return thunkAPI.rejectWithValue("empty response ");
  }

  return data;
});

export const uploadDocument = createAsyncThunk<
  string,
  File,
  { state: RootState; rejectValue: string }
>("upload-document-service", async (payload, thunkAPI) => {
  const abortController = new AbortController();
  const formData = new FormData();

  formData.append("document", payload);
  const response = await fetch(`${baseUrl}/documents/upload`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  if (!response.ok) {
    var respDetails = await response.json();
    abortController.abort();
    return thunkAPI.rejectWithValue(respDetails.message);
  }
  const data = await response.json();

  if (!data) {
    abortController.abort();
    return thunkAPI.rejectWithValue("empty response ");
  }

  return data;
});
