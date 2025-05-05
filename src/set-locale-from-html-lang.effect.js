
import { loadLang } from './actions'
import { store} from './state'

export default function() {
  const lang = document.documentElement.lang || 'en'
  store.dispatch(loadLang(lang))
}
