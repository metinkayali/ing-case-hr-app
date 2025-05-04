import { html } from 'lit'
import { msg, updateWhenLocaleChanges } from '@lit/localize'
import { requestEditEmployee } from './actions'
import { buttonCss, ReduxStateElement } from './lib'

export class AddEmployeeBtn extends ReduxStateElement {
  static get styles() {
    return buttonCss
  }
  constructor() {
    super()
    updateWhenLocaleChanges(this)
  }
  render() {
    return html`
  <button class="color-btn" @click=${() => this.dispatch(requestEditEmployee({}))}>
    <svg style="margin-right: 0.1rem; width: 22px; height: 22px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
    <span style="font-size: 0.95rem;">${msg(`Add New`)}</span>
  </button>`;
  }
}

window.customElements.define('ing-case-add-employee-btn', AddEmployeeBtn);
