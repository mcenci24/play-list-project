import { LitElement, html, css } from "lit";

class PlaylistDescription extends LitElement {
  static styles = css`
    :host {
      display: block;
      max-height: 200px;
      font-size: 16px;
      line-height: 1.5;
      position: relative;
    }

    .scroll-container {
      overflow-y: scroll; 
      overflow-x: hidden;
      max-height: 200px;
      padding-right: 16px; 
      scroll-behavior: smooth;
    }

    .scroll-container::-webkit-scrollbar {
      width: 16px;
    }

    .scroll-container::-webkit-scrollbar-thumb {
      background-color: #aaa;
      border-radius: 90px;
    }

  
    .arrow {
      position: absolute;
      right: 0;
      width: 16px;
      height: 16px;
      color: #aaa; 
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;
      user-select: none;
    }

    .arrow.top {
      top: 0;
    }

    .arrow.bottom {
      bottom: 0;
    }
  `;

  render() {
    return html`
      <button class="arrow top" @click=${() => this._scroll(-40)}>▲</button>
      <div class="scroll-container">
        <slot></slot>
      </div>
      <button class="arrow bottom" @click=${() => this._scroll(40)}>▼</button>
    `;
  }

  _scroll(amount) {
    const container = this.shadowRoot.querySelector(".scroll-container");
    container.scrollBy({ top: amount, behavior: "smooth" });
  }
}

customElements.define("playlist-description", PlaylistDescription);