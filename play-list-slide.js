import { LitElement, html, css } from "lit";
import "./playlist-description.js";

class PlayListSlide extends LitElement {
  static properties = {
    topHeading: { type: String, attribute: "top-heading" },
    secondHeading: { type: String, attribute: "second-heading" },
    active: { type: Boolean, reflect: true },
  };

  static styles = css`
    :host {
      display: none;
      animation: fade 0.3s ease;
    }

    :host([active]) {
      display: block;
    }

    h3 {
  margin: 0 0 8px 0;
  font-weight: 600;
  color: #1a73e8; 
}

    h4 {
  margin: 0 0 16px 0;
  font-weight: 50000;
  font-size: 64px;
  color: #18047a;
}

    @keyframes fade {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  render() {
    return html`
      <h3>${this.topHeading}</h3>
      <h4>${this.secondHeading}</h4>
      <playlist-description>
        <slot></slot>
      </playlist-description>
    `;
  }
}

customElements.define("play-list-slide", PlayListSlide);