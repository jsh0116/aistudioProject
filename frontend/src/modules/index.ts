import { configureStore } from '@reduxjs/toolkit';
import user from './user';
import logger from 'redux-logger';
import aiStudio from './aiStudio';

export const store = configureStore({
  reducer: {
    aiStudio: aiStudio,
    user: user,
  }, // reducer들을 정의
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // 미들웨어 정의
  devTools: process.env.NODE_ENV !== 'production'  // devTool 의 옵션을 선택합니다.
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {board: boardState, user: UserState}
export type AppDispatch = typeof store.dispatch;