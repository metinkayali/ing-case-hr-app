
import { setLocale } from './localization'
import { setLang, store} from './state'

const locale = document.documentElement.lang || 'en'
setLocale(locale)
store.dispatch(setLang(locale))
