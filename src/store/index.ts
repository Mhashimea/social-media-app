import { configureStore } from '@reduxjs/toolkit'
import appReducer from './app'
import userReducer from './user'
import connectionReducer from './connection'

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    connection: connectionReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch