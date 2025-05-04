
import { updateWhenLocaleChanges} from '@lit/localize'
import { createSelector } from '@reduxjs/toolkit'
import { css, html } from 'lit'
import { ReduxStateElement } from './lib'
import { toggleLang } from './actions'

const selectLang = (state) => state.lang
export const iconSrc = createSelector(
  selectLang,
  (lang) => lang === 'en' ? 'image/tr.svg' : 'image/en.svg',
)

export class ToggleLanguageBtn extends ReduxStateElement {
  static get styles() {
    return css`
button {
  border: 0;
  padding: 0;
  cursor: pointer;
  background: transparent;
  display: flex;
  outline: none;
}
    `;
  }
  constructor() {
    super();
    this.iconSrc = ''
    updateWhenLocaleChanges(this);
  }
  stateChanged(state) {
    this.iconSrc = iconSrc(state)
  }

  render() {
    return html`
    <button aria-label="toggleLanguageBtn" @click=${this._onClick} >
      <img src=${this.iconSrc} alt="Locale Flag"></img>
    </button>
    `;
  }

  _onClick() {
    this.dispatch(toggleLang())
  }
}
customElements.define('ing-case-toggle-language-btn', ToggleLanguageBtn);
