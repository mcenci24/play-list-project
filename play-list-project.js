import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./play-list-slide.js";
import "./playlist-arrow.js";
import "./playlist-indicator.js";

export class PlayListProject extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() { return "play-list-project"; }

  constructor() {
    super();
    this.title = "";
    this.index = 0;
    this.slides = [];
    this.t = { ...this.t, title: "Title!" };
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
  background: #e5f2f6cf;
  color: black;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  font-family: Roboto, "Helvetica Neue", Arial, sans-serif;
  position: relative;
  padding: 24px 160px 48px 24px; 
}

        .wrapper {
          position: relative;
          padding: 24px;
        }

        slot {
          display: block;
          min-height: 120px;
        }

        playlist-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
        }

        playlist-arrow[direction="left"] {
          left: 0; 
        }

        playlist-arrow[direction="right"] {
          right: 0; 
        }

      
        .dots-bottom {
           display: flex;
  gap: 12px;
  position: absolute;
  bottom: -8px; 
  left: 16px;
}
      `
    ];
  }

  _handleSlotChange(e) {
    this.slides = e.target.assignedElements();
    this._updateSlides();
  }

  updated(changedProperties) {
    if (changedProperties.has("index")) this._updateSlides();
  }

  _updateSlides() {
    if (!this.slides || this.slides.length === 0) return;
    if (this.index < 0) this.index = 0;
    if (this.index >= this.slides.length - 1) this.index = this.slides.length - 1;

    this.slides.forEach((slide, i) => slide.active = i === this.index);
    this.requestUpdate();
  }

  _arrow(e) {
    if (e.detail.direction === "left" && this.index > 0) this.index--;
    if (e.detail.direction === "right" && this.index < this.slides.length - 1) this.index++;
  }

  _dotChange(e) {
    this.index = e.detail.index;
  }

  render() {
    return html`
      <div class="wrapper">
        <slot @slotchange=${this._handleSlotChange}></slot>

        <playlist-arrow
          direction="left"
          ?disabled=${this.index === 0}
          @playlist-arrow-click=${this._arrow}>
        </playlist-arrow>

        <playlist-arrow
          direction="right"
          ?disabled=${this.index === this.slides.length - 1}
          @playlist-arrow-click=${this._arrow}>
        </playlist-arrow>

        <div class="dots-bottom">
          <playlist-indicator
            .total=${this.slides.length}
            .active=${this.index}
            @play-list-index-changed=${this._dotChange}>
          </playlist-indicator>
        </div>
      </div>
    `;
  }
}

customElements.define(PlayListProject.tag, PlayListProject);