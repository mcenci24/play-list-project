import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./play-list-slide.js";
import "./playlist-arrow.js";
import "./playlist-indicator.js";

export class PlayListProject extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "play-list-project";
  }

  constructor() {
    super();
    this.title = "";
    this.index = 0;
    this.slides = [];
    this.t = { ...this.t, title: "Title!" };

    this.registerLocalization({
      context: this,
      localesPath: new URL("./locales/play-list-project.ar.json", import.meta.url).href + "/../",
    });
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      index: { type: Number }
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          background: white;
          color: black;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          font-family: var(--ddd-font-navigation);
        }

        .wrapper {
          padding: 24px;
        }

        .controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        slot {
          display: block;
          min-height: 120px;
        }
      `
    ];
  }

  _handleSlotChange(e) {
    this.slides = e.target.assignedElements();
    this._updateSlides();
  }

  updated(changedProperties) {
    if (changedProperties.has("index")) {
      this._updateSlides();
    }
  }

  _updateSlides() {
    if (!this.slides || this.slides.length === 0) return;

    if (this.index < 0) this.index = 0;
    if (this.index >= this.slides.length) this.index = this.slides.length - 1;

    this.slides.forEach((slide, i) => {
      slide.active = i === this.index;
    });

    this.requestUpdate();
  }

  _arrow(e) {
    if (e.detail.direction === "left" && this.index > 0) {
      this.index--;
    }

    if (e.detail.direction === "right" && this.index < this.slides.length - 1) {
      this.index++;
    }
  }

  _dotChange(e) {
    this.index = e.detail.index;
  }

  render() {
    return html`
      <div class="wrapper">

        <div class="controls">

          <playlist-arrow
            direction="left"
            ?disabled=${this.index === 0}
            @playlist-arrow-click=${this._arrow}>
          </playlist-arrow>

          <playlist-indicator
            .total=${this.slides.length}
            .active=${this.index}
            @play-list-index-changed=${this._dotChange}>
          </playlist-indicator>

          <playlist-arrow
            direction="right"
            ?disabled=${this.index === this.slides.length - 1}
            @playlist-arrow-click=${this._arrow}>
          </playlist-arrow>

        </div>

        <slot @slotchange=${this._handleSlotChange}></slot>

      </div>
    `;
  }
}

globalThis.customElements.define(PlayListProject.tag, PlayListProject);