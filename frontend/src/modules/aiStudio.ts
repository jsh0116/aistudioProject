import { RootState } from './index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AIStudioState = {
  appId: string;
  userKey: string;
  clientToken: string;
  token: string;
  uuid: string;
  clientHostname: string;
  key: string;
}

const initialState = {
  appId: 'aistudios.com',
  userKey: '6443234b-77d5-4013-bfd6-bb9399f317d9',
  clientToken: '',
  token: '',
  uuid: '6443234b-77d5-4013-bfd6-bb9399f317d9',
  clientHostname: '',
  key: '',
} as AIStudioState;

export const aiStudioSlice = createSlice({
  name: 'aiStudio',
  initialState,
  reducers: {
    setAppId: (state: AIStudioState, action: PayloadAction<string>) => {
      state.appId = action.payload;
    },
    setUserKey: (state: AIStudioState, action: PayloadAction<string>) => {
      state.userKey = action.payload;
    },
    setClientToken: (state: AIStudioState, action: PayloadAction<string>) => {
      state.clientToken = action.payload;
    },
    setToken: (state: AIStudioState, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUuid: (state: AIStudioState, action: PayloadAction<string>) => {
      state.uuid = action.payload;
    },
    setClientHostname: (state: AIStudioState, action: PayloadAction<string>) => {
      state.clientHostname = action.payload;
    },
    setKey: (state: AIStudioState, action: PayloadAction<string>) => {
      state.key = action.payload;
    },
  },
});

export const {
  setAppId,
  setUserKey,
  setClientToken,
  setToken,
  setUuid,
  setClientHostname,
  setKey,
} = aiStudioSlice.actions;

export const getAppId = (state: RootState) => state.aiStudio.appId;
export const getUserKey = (state: RootState) => state.aiStudio.userKey;
export const getClientToken = (state: RootState) => state.aiStudio.clientToken;
export const getToken = (state: RootState) => state.aiStudio.token;
export const getUuid = (state: RootState) => state.aiStudio.uuid;
export const getCiientHostname = (state: RootState) => state.aiStudio.clientHostname;
export const getKey = (state: RootState) => state.aiStudio.key;

export default aiStudioSlice.reducer;