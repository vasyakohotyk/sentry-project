import { configureStore } from '@reduxjs/toolkit'
import workflowSlice from '../reducer'
export const store = configureStore({
  reducer: {
    workflow: workflowSlice,
},
})