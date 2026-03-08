import { LitElement, html, css } from "lit";

class PlaylistIndicator extends LitElement {
  static properties = {
    total: { type: Number },
    active: { type: Number },
  };

  static styles = css`
    :host {
      display: flex;
      gap: 8px;
    }

    span {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #ccc;
      cursor: pointer;
      transition: 0.2s ease;
    }

    span.active {
      background: #000;
      transform: scale(1.2);
    }
  `;

  _select(index) {
    this.dispatchEvent(
      new CustomEvent("play-list-index-changed", {
        bubbles: true,
        composed: true,
        detail: { index },
      })
    );
  }

  render() {
    return html`
      ${Array.from({ length: this.total || 0 }).map(
        (_, i) => html`
          <span
            class=${i === this.active ? "active" : ""}
            @click=${() => this._select(i)}
          ></span>
        `
      )}
    `;
  }
}

customElements.define("playlist-indicator", PlaylistIndicator);