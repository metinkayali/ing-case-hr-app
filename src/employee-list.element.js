import { css, html } from 'lit'
import 'lit-pagination'
import { msg, updateWhenLocaleChanges } from '@lit/localize'
import { ReduxStateElement, ListViewType } from './lib'
import './edit-employee-btn'
import './edit-employee-dialog'
import './delete-employee-btn'
import './delete-employee-dialog'
import './show-grid-btn'
import './show-table-btn'

export class EmployeeListElement extends ReduxStateElement {
  static get styles() {
    return css`
:host {
  display: flex;
  flex-flow: column;
  height: 100%;
  overflow: hidden;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
main {
  flex: 1;
  overflow: auto;
}
footer {
  display: flex;
  justify-content: center;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  position: sticky;
  top: 0;
  background-color: green;
}
td, th {
  padding: 20px 10px;
  text-align: center;
  background: #fff;
  border-bottom: 1px solid #ccc;
}
.actions-cell > button > img {
  width: 18px;
  height: 18px;
}
.view-toggle-btn > img {
  width: 20px;
  height: 20px;
}
.hidden {
  display: none;
}
.grid-pane {
  display: flex;
  flex-wrap: wrap;
}
.grid-card {
  display: grid;
  grid-template-columns: auto auto;
  margin: 0 0.3rem 0.3rem 0;
  padding: 0.5rem 0.3rem 0.3rem 0.5rem;
  background-color: #fff;
  border: 1px solid #ddd;
}
.card-cell {
  display: flex;
  margin: 0 0.5rem 0.5rem 0;
}
.card-cell > .title-text {
  width: 10rem;
}
.content-cell {
  flex: 1;
}
.title-text {
  color: rgb(255, 98, 0);
  font-weight: bold;
  font-size: 0.82rem;
}
h3.title-text {
  font-size: 1.3rem;
}
.content-cell > .btn-pane {
  width: 100%;
}
.btn-pane {
  display: flex;
  justify-content: space-around;
}
.list-view-select-pane {
  display: flex;
}
.list-view-select-pane > * {
  margin-left: 0.5rem;
}
.highlight {
  background-color: rgba(0, 0, 240, 0.05);
}
    `;
  }
  constructor() {
    super()
    this.employees = []
    this.viewType = ListViewType.Table
    updateWhenLocaleChanges(this)
  }
  stateChanged(state) {
    this.employees = state.employees
    this.highlightItem = state.highlightEmployee
    this.viewType = state.listViewType
    this.update()
  }
  render() {
    return html`
      <header>
        <h3 class="title-text">${msg(`Employee List`)}</h3>
        <div class="list-view-select-pane">
          <ing-case-show-table-btn></ing-case-show-table-btn>
          <ing-case-show-grid-btn></ing-case-show-grid-btn>
        </div>
      </header>
      <main>
        <table class=${this.viewType === ListViewType.Table ? 'show' : 'hidden'}>
              <tr>
                <th class="title-text">${msg(`First Name`)}</th>
                <th class="title-text">${msg(`Last Name`)}</th>
                <th class="title-text">${msg(`Date of Employement`)}</th>
                <th class="title-text">${msg(`Date of Birth`)}</th>
                <th class="title-text">${msg(`Phone`)}</th>
                <th class="title-text">${msg(`Email`)}</th>
                <th class="title-text">${msg(`Department`)}</th>
                <th class="title-text">${msg(`Actions`)}</th>
              </tr>
              ${this.employees.map(
                ([id, name, name2, employmentDate, birthDate, phone, email, department]) =>
                  html`<tr id=${id}>
                    <td class="${this._highlightClass(id)}">${name}</td>
                    <td class="${this._highlightClass(id)}">${name2}</td>
                    <td class="${this._highlightClass(id)}">${this._formatDate(employmentDate)}</td>
                    <td class="${this._highlightClass(id)}">${this._formatDate(birthDate)}</td>
                    <td class="${this._highlightClass(id)}">${phone}</td>
                    <td class="${this._highlightClass(id)}">${email}</td>
                    <td class="${this._highlightClass(id)}">${department}</td>
                    <td class="${this._highlightClass(id)}">
                      <div class="btn-pane">
                        <ing-case-edit-employee-btn employeeId=${id}></ing-case-edit-employee-btn>
                        <ing-case-delete-employee-btn employeeId=${id}></ing-case-delete-employee-btn>
                      </div>
                    </td>
                  </tr>`
                )}
            </table>
        <div class=${this.viewType === ListViewType.Grid ? 'grid-pane' : 'hidden'}>
          ${this.employees.map(
            ([id, name, name2, employmentDate, birthDate, phone, email, department]) =>
              html`<div class="${this._highlightClass(id, 'grid-card')}">
                <div class="card-cell">
                  <div class="title-text">${msg(`First Name`)}</div>
                  <div class="content-cell">${name}</div>
                </div>
                <div class="card-cell">
                  <div class="title-text">${msg(`Date of Employement`)}</div>
                  <div class="content-cell">${this._formatDate(employmentDate)}</div>
                </div>
                <div class="card-cell">
                  <div class="title-text">${msg(`Last Name`)}</div>
                  <div class="content-cell">${name2}</div>
                </div>
                <div class="card-cell">
                  <div class="title-text">${msg(`Date of Birth`)}</div>
                  <div class="content-cell">${this._formatDate(birthDate)}</div>
                </div>
                <div class="card-cell">
                  <div class="title-text">${msg(`Phone`)}</div>
                  <div class="content-cell">${phone}</div>
                </div>
                <div class="card-cell">
                  <div class="title-text">${msg(`Department`)}</div>
                  <div class="content-cell">${department}</div>
                </div>
                <div class="card-cell">
                  <div class="title-text">${msg(`Email`)}</div>
                  <div class="content-cell">${email}</div>
                </div>
                <div class="card-cell">
                  <div class="title-text"></div>
                  <div class="content-cell">
                    <div class="btn-pane">
                      <ing-case-edit-employee-btn employeeId=${id}></ing-case-edit-employee-btn>
                      <ing-case-delete-employee-btn employeeId=${id}></ing-case-delete-employee-btn>
                    </div>
                  </div>
                </div>
              </div>`
            )}
        </div>
      </main>
      <footer>
        <lit-pagination page=1 limit=9 total=891 size=2></lit-pagination>
      </footer>
    <ing-case-edit-employee-dialog></ing-case-edit-employee-dialog>
    <ing-case-delete-employee-dialog></ing-case-delete-employee-dialog>
    `;
  }

  _showView(viewType) {
    if (viewType !== this.viewType) {
      this.viewType = viewType
      this.update()
    }
  }

  _formatDate(time) {
    const d = new Date(time)
    const MM = (d.getUTCMonth() + 1).toString().padStart(2, '0')
    const DD = d.getUTCDate().toString().padStart(2, '0')
    const YYYY = d.getUTCFullYear().toString()
    return `${DD}/${MM}/${YYYY}`
  }

  _highlightClass(employeeId, commonClass = 'content-cell') {
    if (this.highlightItem === employeeId) {
      return `${commonClass} highlight`
    }
    return commonClass
  }
}

window.customElements.define('ing-case-employee-list', EmployeeListElement);
