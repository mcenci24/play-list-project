import { LitElement, html } from "lit";

class PlaylistDescription extends LitElement {
  render() {
  return html`
    <div style="
      overflow-y: auto; 
      overflow-x: hidden; 
      max-height: 200px; 
      padding-right: 8px;">
      <slot></slot>
    </div>
  `;
}
}

customElements.define("playlist-description", PlaylistDescription);