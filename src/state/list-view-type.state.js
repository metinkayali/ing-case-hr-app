import { createSlice } from '@reduxjs/toolkit'

const listViewType = createSlice({
  name: 'listViewType',
  initialState: 'table',
  reducers: {
    setListView(state, action) {
      return action.payload
    },
  },
})

export const { setListView } = listViewType.actions
export default listViewType.reducer
