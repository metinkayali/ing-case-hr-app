
import { css, html } from 'lit'
import { dismissEmployeeEdit, submitForm } from './actions'
import { ReduxStateElement, buttonCss, selectFormInputs, titleTextCss } from './lib'

const getFormInput = selectFormInputs('add', 'edit')
export class EditEmployeeDialog extends ReduxStateElement {
  static get styles() {
    return [
      titleTextCss,
      buttonCss,
      css`
  input[type=text],
  input[type=date],
  input[type=email],
  input[type=tel],
  select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 1rem;
  }
  dialog {
    padding: 0 1.3rem;
    border: 1px solid #ddd;
  }
      `,
    ]
  }
  constructor() {
    super()
    this._formInput = []
  }

  stateChanged(state) {
    const { formInput, isEmpty } = getFormInput(state)
    this._formInput = formInput
    if (isEmpty) {
      this._closeDialog()
    } else {
      this._showDialog()
    }
    this.update()
  }

  render() {
    return html`
<dialog id="employee-dialog">
  <header><h4 class="title-text">Edit</h4></header>
  <main>
    <form>
      <label class="title-text" for="name">First Name</label>
      <input type="text" name="name" id="name" .value="${this._formInput[1]}"
        @change=${(evt) => this._formInput[1] = evt.target.value} /><br>
      <label class="title-text" for="name2">Last Name</label>
      <input type="text" name="name2" id="name2" .value=${this._formInput[2]}
        @change=${(evt) => this._formInput[2] = evt.target.value} /><br>
      <label class="title-text" for="employmentDate">Date of Employment</label>
      <input type="date" name="employmentDate" .valueAsNumber=${this._formInput[3]} id="employmentDate"
        @change=${(evt) => this._formInput[3] = evt.target.valueAsNumber } /><br>
      <label class="title-text" for="birthDate">Date of Birth</label>
      <input type="date" name="birthDate" .valueAsNumber=${this._formInput[4]} id="birthDate"
        @change=${(evt) => this._formInput[4] = evt.target.valueAsNumber } /><br>
      <label class="title-text" for="phone">Phone</label>
      <input type="tel" name="phone" id="phone" .value=${this._formInput[5]}
        @change=${(evt) => this._formInput[5] = evt.target.value} /><br>
      <label class="title-text" for="email">EMail</label>
      <input type="email" name="email" id="email" .value=${this._formInput[6]}
        @change=${(evt) => this._formInput[6] = evt.target.value} /><br>
      <label class="title-text" for="department">Department</label>
      <select name="department" id="department"
        @change=${(evt) => this._formInput[7] = evt.target.value}>
        <option value="Analytics" ?selected=${this._formInput[7] === 'Analytics'}>Analytics</option>
        <option value="Tech" ?selected=${this._formInput[7] === 'Tech'}>Tech</option>
      </select><br>
      <input class="full-btn" type="submit" value="Apply"
        @click=${() => this.dispatch(submitForm(this._formInput))} /><br>
      <input class="full-btn inverted-btn" type="button" value="Cancel"
        @click=${() => this._closeDialog()} />
    </form>
  </main>
</dialog>
    `;
  }

  _closeDialog() {
    this._executeOnDialog((dialog) => dialog.close())
  }
  _showDialog() {
    this._executeOnDialog((dialog) => dialog.showModal())
  }

  _registeredOnce = false
  _executeOnDialog(doFn) {
    const dialog = this.renderRoot.querySelector('#employee-dialog')
    if (dialog) {
      if (!this._registeredOnce) {
        dialog.addEventListener('close', () => {
          this.dispatch(dismissEmployeeEdit())
        })
        this._registeredOnce = true
      }
      doFn(dialog)
    }
  }
}
window.customElements.define('ing-case-edit-employee-dialog', EditEmployeeDialog);
