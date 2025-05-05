
import { configureLocalization } from '@lit/localize';
import { sourceLocale, targetLocales } from './generated/locale-codes';
import * as trLocale from './generated/locales/tr';

export const {getLocale, setLocale} = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: async () => trLocale, // there is single locale for this app
});
