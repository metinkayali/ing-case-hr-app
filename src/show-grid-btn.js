
import { css, html } from 'lit'
import { setListView } from './actions'
import { ListViewType, ReduxStateElement, buttonCss } from './lib'

export class ShowGridBtn extends ReduxStateElement {
  static get styles() {
    return [
      buttonCss,
css`
      .color-btn svg {
        width: 1.6rem;
        height: 1.6rem;
      }
      .selected {
        color: purple;
      }
  `,
    ]
  }

  constructor() {
    super()
    this.selectedClass = ''
  }

  render() {
    return html`
  <button class="color-btn"  @click=${this._onClick}>
    <svg class=${this.selectedClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
      <path fill="currentColor" d="M64 256l0-96 160 0 0 96L64 256zm0 64l160 0 0 96L64 416l0-96zm224 96l0-96 160 0 0 96-160 0zM448 256l-160 0 0-96 160 0 0 96zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32z"/></svg>
  </button>
    `;
  }

  stateChanged(state) {
    this.selectedClass = state.listViewType === ListViewType.Grid ? 'selected' : ''
    this.update()
  }

  _onClick() {
    this.dispatch(setListView({ viewType: ListViewType.Grid }))
  }
}
customElements.define('ing-case-show-grid-btn', ShowGridBtn);
