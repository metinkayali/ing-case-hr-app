import { createSlice } from '@reduxjs/toolkit'

const employees = createSlice({
  name: 'employees',
  initialState: [],
  reducers: {
    setEmployees(state, action) {
      return action.payload
    },
    upsertEmployee(state, action) {
      const { employee } = action.payload
      const index = state.findIndex(([id]) => id === employee[0])
      if (index >= 0) {
        state.splice(index, 1, employee)
      } else {
        state.splice(0, 0, employee)
      }
      return state
    },
    deleteEmployee(state, action) {
      const { employee } = action.payload
      const index = state.findIndex(([id]) => id === employee[0])
      if (index >= 0) {
        state.splice(index, 1)
      }
      return state
    },
  },
})

export const { setEmployees, upsertEmployee, deleteEmployee } = employees.actions
export default employees.reducer
