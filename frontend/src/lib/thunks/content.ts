import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { ContentType } from "@/@types/content";

const baseUrl = import.meta.env.VITE_API_URL;

type Payload = {
  content: string;
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

export const updateContent = createAsyncThunk<
  string,
  Payload,
  { state: RootState; rejectValue: string }
>("content-processing-service", async (payload, thunkAPI) => {
  const abortController = new AbortController();

  const response = await fetch(`${baseUrl}/content/content_id`, {
    method: "PUT",
    body: JSON.stringify(payload),
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

  return data.token;
});

export const deleteContent = createAsyncThunk<
  string,
  Payload,
  { state: RootState; rejectValue: string }
>("content-processing-service", async (payload, thunkAPI) => {
  const abortController = new AbortController();

  const response = await fetch(`${baseUrl}/content/content_id`, {
    method: "DELETE",
    body: JSON.stringify(payload),
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

  return data.token;
});

export const fetchContent = createAsyncThunk<
  string,
  Payload,
  { state: RootState; rejectValue: string }
>("content-processing-service", async (payload, thunkAPI) => {
  const abortController = new AbortController();

  const response = await fetch(`${baseUrl}/content/content_id`, {
    method: "GET",
    body: JSON.stringify(payload),
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

export const createContent = createAsyncThunk<
  string,
  Payload,
  { state: RootState; rejectValue: string }
>("content-processing-service", async (payload, thunkAPI) => {
  const abortController = new AbortController();

  const response = await fetch(`${baseUrl}/content`, {
    method: "POST",
    body: JSON.stringify(payload),
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
  console.log("this is the data", data);
  return data;
});
