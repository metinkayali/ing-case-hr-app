import { LitElement, css } from 'lit'
import { connect } from 'pwa-helpers'
import { store } from './state'
import { createSelector } from '@reduxjs/toolkit'

/**
 * Utility class to ease Redux + LitElement connection
 */
export class ReduxStateElement extends connect(store)(LitElement) {
  /**
   * Dispatch an action object to Redux store
   */
  dispatch(...params) {
    store.dispatch(...params)
  }
}

export const titleTextCss = css`.title-text { color: rgb(255, 98, 0); }`
export const buttonCss = css`
.full-btn {
  width: 100%;
  background-color: rgb(255, 98, 0);
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.full-btn:hover {
  background-color: orange;
}
.inverted-btn {
  color: purple;
  border: 1px solid purple;
  background-color: white;
}
.inverted-btn:hover {
  background-color: #ddd;
}
.color-btn {
  border: 0;
  padding: 0;
  cursor: pointer;
  background: transparent;
  display: flex;
  outline: none;
  color: rgb(255, 98, 0);
  display: flex;
  align-items: center;
}
.color-btn:hover {
  color: purple;
}
.color-btn svg {
  width: 1.1rem;
  height: 1.1rem;
}`

export class EmployeeListBtnBase extends ReduxStateElement {
  static get properties() {
    return ({
      /**
       * Target employee id string
       */
      employeeId: { attribute: true, type: String },
    })
  }
  static get styles() {
    return buttonCss 
  }
}

export const ListViewType = { Table: 'table', Grid: 'grid' }

export const selectEmployees = (state) => state.employees
export const selectFormInputs = (...employeeActions) => createSelector(
  (state) => state.editingEmployee,
  (editingEmployee) => {
    if (editingEmployee && employeeActions.includes(editingEmployee.action)) {
      return ({ formInput: [...editingEmployee.employee] })
    } else {
      return ({ formInput: [], isEmpty: true })
    }
  }
)
