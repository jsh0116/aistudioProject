import { RootState } from './index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 이 redux module에서 관리할 state의 type 선언
type userState = {
  userEmail: string;
  userName: string;
  userPassword: string;
};

// 초기 state 선언
// Workaround: cast state instead of declaring variable type
const initialState = {
  userEmail: '',
  userName: '',
  userPassword: '',
} as userState; 

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserEmail: (state: userState, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
    setUserName: (state: userState, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setUserPassword: (state: userState, action: PayloadAction<string>) => {
      state.userPassword = action.payload;
    },
  },
})

export const { setUserEmail, setUserName, setUserPassword } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserEmail = (state: RootState) => state.user.userEmail;
export const selectUserName = (state: RootState) => state.user.userName;
export const selectUserPassword = (state: RootState) => state.user.userPassword;

export default userSlice.reducer;