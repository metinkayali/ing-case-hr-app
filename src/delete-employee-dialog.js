
import { css, html } from 'lit'
import { deleteEmployee } from './actions'
import { ReduxStateElement, buttonCss, selectFormInputs, titleTextCss } from './lib'

const getDeletingEmployee = selectFormInputs('delete')
export class DeleteEmployeeDialog extends ReduxStateElement {
  static get styles() {
    return [
      titleTextCss,
      buttonCss,
      css`
  dialog {
    padding: 0 1.3rem;
    border: 1px solid #ccc;
  }
      `,
    ]
  }
  constructor() {
    super()
    this.deletingEmployee = []
  }

  stateChanged(state) {
    const { formInput: deletingEmployee, isEmpty } = getDeletingEmployee(state)
    this.deletingEmployee = deletingEmployee
    if (isEmpty) {
      this._closeDialog()
    } else {
      this._showDialog()
    }
    this.update()
  }

  render() {
    return html`
<dialog id="employee-delete-dialog">
  <header><h4 class="title-text">Are you sure?</h4></header>
  <main>
    <form>
      <p>Selected employee record of ${this.deletingEmployee[1]} ${this.deletingEmployee[2]} will be deleted.</p>
      <input class="full-btn" type="button" value="Proceed"
        @click=${() => this.dispatch(deleteEmployee({ employee: this.deletingEmployee }))} />
      <input class="full-btn inverted-btn" type="button" value="Cancel"
        @click=${this._closeDialog} />
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

  _executeOnDialog(doFn) {
    const dialog = this.renderRoot.querySelector('#employee-delete-dialog')
    if (dialog) {
      doFn(dialog)
    }
  }
}
window.customElements.define('ing-case-delete-employee-dialog', DeleteEmployeeDialog);
