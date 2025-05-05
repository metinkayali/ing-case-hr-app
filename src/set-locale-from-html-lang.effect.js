
import { loadLang } from './actions'
import { store} from './state'

const lang = document.documentElement.lang || 'en'
store.dispatch(loadLang(lang))
