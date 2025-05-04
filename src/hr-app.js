import { LitElement, css, html } from 'lit'
import './add-employee-btn'
import './employee-list.element'
import './toggle-language-btn'

export class HRApp extends LitElement {
  static get styles() {
    return css`
:host {
  display: grid;
  grid-template-rows: 3rem auto;
  height: 100%;
  display: flex;
  flex-flow: column;
}
header {
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
}
main {
  background-color: rgb(248, 248, 248);
  flex: 1;
  overflow: hidden;
}
.actions-pane {
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 0.5rem;
  align-items: center;
}
.logo {
  display: flex;
  align-items: center;
}
.logo > img {
  margin-right: 0.5rem;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 5px;
}
@media only screen and (max-width: 1080px) {
  main {
    padding: 0.5rem;
  }
}
@media only screen and (min-width: 1080px) {
  main {
    padding: 1rem 5rem;
  }
}
`;
  }
  render() {
    return html`
<header>
  <div class="logo">
    <img src="image/logo.jpg" alt="Company Logo"></img>
    <span class="org-name">ING</span>
  </div>
  <div class="actions-pane">
    <ing-case-add-employee-btn></ing-case-add-employee-btn>
    <ing-case-toggle-language-btn></ing-case-toggle-language-btn>
  </div>
</header>
<main>
  <ing-case-employee-list></ing-case-employee-list>
</main>
    `;
  }
}

window.customElements.define('ing-case-hr-app', HRApp)
