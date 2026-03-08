import { LitElement, html, css } from "lit";

class PlaylistArrow extends LitElement {
  static properties = {
    direction: { type: String },
    disabled: { type: Boolean, reflect: true },
  };

  static styles = css`
    button {
      background: black;
      color: white;
      border: none;
      border-radius: 50%;
      width: 42px;
      height: 42px;
      font-size: 20px;
      cursor: pointer;
      transition: 0.2s ease;
    }

    button:hover:not(:disabled) {
      transform: scale(1.05);
      background: #222;
    }

    button:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  `;

  _click() {
    if (this.disabled) return;

    this.dispatchEvent(
      new CustomEvent("playlist-arrow-click", {
        bubbles: true,
        composed: true,
        detail: { direction: this.direction },
      })
    );
  }

  render() {
    return html`
      <button
        ?disabled=${this.disabled}
        @click=${this._click}
      >
        ${this.direction === "left" ? "‹" : "›"}
      </button>
    `;
  }
}

customElements.define("playlist-arrow", PlaylistArrow);