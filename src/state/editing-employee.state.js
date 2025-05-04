import { createSlice } from '@reduxjs/toolkit'

const editingEmployee = createSlice({
  name: 'editingEmployee',
  initialState: false,
  reducers: {
    setEditingEmployee(state, action) {
      return action.payload
    },
    resetEditingEmployee() {
      return false
    },
  },
})

export const { setEditingEmployee, resetEditingEmployee } = editingEmployee.actions
export default editingEmployee.reducer
