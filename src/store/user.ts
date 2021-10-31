import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
  currentUser: any
}

const initialState: AppState = {
  currentUser: {}
}

export const appSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setCurrentEmployee: (state, action: PayloadAction<boolean>) => {
      state.currentUser = action.payload
    },
  }
})

export const { setCurrentEmployee } = appSlice.actions

export default appSlice.reducer