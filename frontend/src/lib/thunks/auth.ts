import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const baseUrl = import.meta.env.VITE_API_URL;

type Payload = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

type SignupPayload = {
  username: string;
  password: string;
  email: string;
};

export const loginService = createAsyncThunk<
  LoginResponse,
  Payload,
  { state: RootState; rejectValue: string }
>("login-service", async (payload, thunkAPI) => {
  const abortController = new AbortController();

  const response = await fetch(`${baseUrl}/user/login`, {
    method: "POST",
    body: JSON.stringify(payload),
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
  const data = await response.json();
  console.log("this is the data", data);
  if (!data) {
    abortController.abort();
    return thunkAPI.rejectWithValue("empty response ");
  }

  return data;
});

export const signupService = createAsyncThunk<
  LoginResponse,
  SignupPayload,
  { state: RootState; rejectValue: string }
>("signup-service", async (payload, thunkAPI) => {
  const abortController = new AbortController();

  console.log("this is the payload", payload);

  const response = await fetch(`${baseUrl}/user/signup`, {
    method: "POST",
    body: JSON.stringify(payload),
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

export const logOutService = createAsyncThunk<
  string,
  void,
  { state: RootState; rejectValue: string }
>("logout-service", async (_, thunkAPI) => {
  const abortController = new AbortController();

  const response = await fetch(`${baseUrl}/user/logout`, {
    method: "GET",
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
  const data = await response.json();
  if (!data) {
    abortController.abort();
    return thunkAPI.rejectWithValue("empty response ");
  }

  return data;
});
