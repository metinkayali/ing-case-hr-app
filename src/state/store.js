import { configureStore } from '@reduxjs/toolkit'
import editingEmployee from './editing-employee.state'
import employees from './employees.state'
import highlightEmployee from './highlight-employee.state'
import lang from './lang.state'
import listViewType from './list-view-type.state'

export const store = configureStore({
  reducer: {
    editingEmployee,
    employees,
    highlightEmployee,
    lang,
    listViewType,
  },
})
