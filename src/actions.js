import { selectEmployees } from './lib'
import { setLocale } from './localization'
import { resetEditingEmployee,
  setEditingEmployee, setEmployees,
  setLang, setListView as setView,
  deleteEmployee as deleteSingleEmployee,
  upsertEmployee as upsertSingleEmployee,
  highlightEmployee,
  resetHighlight,
} from './state'

export function toggleLang() {
  return function(dispatch, getState) {
    const currentLang = getState().lang
    const nextLang = currentLang === 'en' ? 'tr' : 'en'
    dispatch(loadLang(nextLang))
  }
}

export function loadLang(lang) {
  return function(dispatch) {
    setLocale(lang) // side effect
    dispatch(setLang(lang))
  }
}

export function loadEmployees(employeeProviderFn) {
  return async function(dispatch) {
    const payload = await employeeProviderFn()
    dispatch(setEmployees(payload))
  }
}

export function requestEditEmployee({ employeeId }) {
  return async function(dispatch, getState) {
    dispatch(resetHighlight())
    const employees = selectEmployees(getState())
    const employee = employees.find(([id]) => id === employeeId)
    if (employee) {
      dispatch(setEditingEmployee({ employee, action: 'edit' }))
    } else {
      dispatch(setEditingEmployee({
        employee: newEmployeeTemplate(),
        action: 'add',
      }))
    }
  }

  function newEmployeeTemplate() {
    const employmentDateAsNow = new Date().getTime()
    return [undefined, null, null, employmentDateAsNow, undefined, null, null, 'Tech']
  }
}

export function requestDeleteEmployee({ employeeId }) {
  return async function(dispatch, getState) {
    dispatch(resetHighlight())
    const employees = selectEmployees(getState())
    const employee = employees.find(([id]) => id === employeeId)
    if (employee) {
      dispatch(setEditingEmployee({employee, action: 'delete' }))
    }
  }
}

export function dismissEmployeeEdit() {
  return function(dispatch) {
    dispatch(resetEditingEmployee())
  }
}

export function deleteEmployee({ employee }) {
  return mockRemoteInteraction(deleteSingleEmployee, employee)
}

export function submitForm(formInput) {
  return mockRemoteInteraction(upsertSingleEmployee, formInput)
}

export function setListView({ viewType }) {
  return async function(dispatch) {
    dispatch(setView(viewType))
  }
}

let mockId = 1
function mockRemoteInteraction(stateAction, employee) {
  const ApiProcessDurationMs = 500
  return async function(dispatch) {
    dispatch(resetEditingEmployee())
    setTimeout(() => {
      employee[0] = employee[0] || `mockId${mockId++}`
      dispatch(stateAction({ employee }))
      dispatch(highlightOnSuccess(employee))
    }, ApiProcessDurationMs);
  }
}

let timeoutHandle
export function highlightOnSuccess(employee) {
  const HighlightDurationMs = 50000
  return function(dispatch) {
    dispatch(highlightEmployee(employee[0]))
    if (timeoutHandle) {
      clearTimeout(timeoutHandle)
      timeoutHandle = null
    }
    timeoutHandle = setTimeout(() => {
      dispatch(resetHighlight())
    }, HighlightDurationMs);
  }
}