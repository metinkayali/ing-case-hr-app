
import { loadEmployees } from './actions.js'
import { store } from './state'

const generateEmployees = (count) => {
  const acc = []
  for (let i = 0; i < count; i++) {
    const employee = [
      `${i+1}`,
      'Ahmet',
      'Sourtimes',
      1663804800000,
      1663804800000,
      '+(90) 532 123 45 67',
      'ahmet@sourtimes.org',
      'Analytics',
      'Junior',
    ]
    acc.push(employee)
  }
  return acc
}

export default function() {
  const providerFn = async () => generateEmployees(9)
  store.dispatch(loadEmployees(providerFn))
}
