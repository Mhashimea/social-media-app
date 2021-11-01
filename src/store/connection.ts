import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ConnectionState {
  followers: any[],
  followings: any[],
  feeds: any[]
}

const initialState: ConnectionState = {
  followers: [],
  followings: [],
  feeds: []
}

export const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    setFollowings: (state, action: PayloadAction<any[]>) => {
      state.followings = action.payload
    },
    setFollowers: (state, action: PayloadAction<any[]>) => {
      state.followers = action.payload
    },
    setFeedsData: (state, action: PayloadAction<any[]>) => {
      state.feeds = action.payload
    },
  }
})

export const { setFollowings, setFollowers, setFeedsData } = connectionSlice.actions

export default connectionSlice.reducer