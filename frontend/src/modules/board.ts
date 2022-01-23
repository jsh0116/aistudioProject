import { RootState } from './index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Board } from '../model/board';

// 이 redux module에서 관리할 state의 type 선언
type BoardState = {
  boardList: Board[];
};

// 초기 state 선언
// Workaround: cast state instead of declaring variable type
const initialState = {
  boardList: []
} as BoardState; 

export const boardSlice = createSlice({
  name: 'board',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setBoardList: (state: BoardState, action: PayloadAction<Board[]>) => {
      state.boardList = action.payload
    },
  },
})

export const { setBoardList } = boardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getBoardList = (state: RootState) => state.board.boardList;

export default boardSlice.reducer;