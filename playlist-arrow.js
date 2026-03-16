import { LitElement, html, css } from "lit";

class PlaylistArrow extends LitElement {
  static properties = {
    direction: { type: String },
    disabled: { type: Boolean, reflect: true },
  };

  static styles = css`
    button {
      background: white;
      color: #1a73e8;
      border: 3px solid #1a73e8;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      font-size: 40px;        
      font-weight: 700;
      cursor: pointer;
      transition: 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    button:hover:not(:disabled) {
      background: #e8f0fe;
      transform: translateY(-50%) scale(1.05);
    }

    button:disabled {
      opacity: 0.3;
      cursor: not-allowed;
      border-color: #aaa;
      color: #aaa;
    }

    button[direction="left"] {
      left: -52px;
    }

    button[direction="right"] {
      right: -186px;
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
        direction=${this.direction}
      >
        ${this.direction === "left" ? "‹" : "›"}
      </button>
    `;
  }
}

customElements.define("playlist-arrow", PlaylistArrow);