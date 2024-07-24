import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { ContentType } from "@/@types/content";

const baseUrl = import.meta.env.VITE_API_URL;

type Payload = {
  content: string;
  id: number;
  document_id: number;
};

type SavePayload = {
  text: string;
  id: number;
  document_id: number;
};

export const processContent = createAsyncThunk<
  string,
  Payload,
  { state: RootState; rejectValue: string }
>("post-content-for-processing-service", async (payload, thunkAPI) => {
  const abortController = new AbortController();
  console.log("this is the payload", payload);
  const data = {
    content: payload.content,
    document_id: payload.document_id,
  };

  const response = await fetch(`${baseUrl}/content/${payload.id}/improve`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    var respDetails = await response.json();
    abortController.abort();
    return thunkAPI.rejectWithValue(respDetails.message);
  }
  const respData = await response.json();
  if (!respData) {
    abortController.abort();
    return thunkAPI.rejectWithValue("empty response ");
  }

  return respData;
});

export const saveContent = createAsyncThunk<
  string,
  SavePayload,
  { state: RootState; rejectValue: string }
>("content-save-service", async (payload, thunkAPI) => {
  const abortController = new AbortController();

  const response = await fetch(`${baseUrl}/content/${payload.id}`, {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
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

export const deleteContent = createAsyncThunk<
  string,
  Payload,
  { state: RootState; rejectValue: string }
>("content-delete-service", async (payload, thunkAPI) => {
  const abortController = new AbortController();

  const response = await fetch(`${baseUrl}/content/${payload.id}`, {
    method: "DELETE",
    body: JSON.stringify(payload),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
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

export const fetchContent = createAsyncThunk<
  ContentType,
  number,
  { state: RootState; rejectValue: string }
>("content-get-service", async (id, thunkAPI) => {
  const abortController = new AbortController();

  const response = await fetch(`${baseUrl}/content/${id}`, {
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

  return data.content;
});

export const fetchOriginalContent = createAsyncThunk<
  ContentType,
  number,
  { state: RootState; rejectValue: string }
>("content-processing-service", async (documentId, thunkAPI) => {
  const abortController = new AbortController();

  const response = await fetch(`${baseUrl}/content/original/${documentId}`, {
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
  return data;
});
