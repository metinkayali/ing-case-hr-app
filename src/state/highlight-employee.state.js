import { createSlice } from '@reduxjs/toolkit'

const highlightingItem = createSlice({
  name: 'highlighingItem',
  initialState: null,
  reducers: {
    highlightEmployee(state, action) {
      return action.payload
    },
    resetHighlight() {
      return null
    },
  },
})

export const { highlightEmployee, resetHighlight } = highlightingItem.actions
export default highlightingItem.reducer
