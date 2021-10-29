import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
  addPostModal: boolean
}

const initialState: AppState = {
  addPostModal: false
}

export const appSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setPostModal: (state, action: PayloadAction<boolean>) => {
      state.addPostModal = !state.addPostModal
    },
  }
})

export const { setPostModal } = appSlice.actions

export default appSlice.reducer