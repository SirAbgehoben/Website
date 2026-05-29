import { n as e } from "./chunk-DiqZc92J.js";
import { $ as t, C as n, D as r, at as i, et as a, it as o, n as s, r as c, t as l, u, ut as d, w as f } from "./icons-DoMJjP82.js";
import { a as p, d as m, i as h, l as g, n as _, o as v, r as y, s as b, t as x } from "./section-panel-ui-state-QV2-K89y.js";
import { n as S, t as C } from "./copilot-eventbus-tR06exIW.js";
import { n as w, r as T } from "./copilot-ui-state-DjlBBpyf.js";
import { r as E, t as D } from "./stats-BSuRK33k.js";
import { n as O, o as k, t as A } from "./copilot-error-handler-DrF5aMdz.js";
import { n as j, t as M } from "./base-panel-DSO7zZ78.js";
//#region frontend/copilot/plugins/copilot-log/copilot-log-plugin.css?inline
var N, P = e((() => {
	N = "copilot-log-panel ul{margin:0;padding:0;list-style-type:none}copilot-log-panel ul li{align-items:start;gap:var(--space-50);padding:var(--space-100) var(--space-50);display:flex;position:relative}copilot-log-panel ul li:before{border-bottom:1px dashed var(--divider-primary-color);content:\"\";inset:auto 0 0 calc(var(--copilot-size-md) + var(--space-100));position:absolute}copilot-log-panel ul li span.icon{width:var(--copilot-size-md);flex-shrink:0;justify-content:center;display:flex}copilot-log-panel ul li.information span.icon{color:var(--blue-color)}copilot-log-panel ul li.warning span.icon{color:var(--warning-color)}copilot-log-panel ul li.error span.icon{color:var(--error-color)}copilot-log-panel ul li .message{flex-direction:column;flex-grow:1;display:flex;overflow:hidden}copilot-log-panel ul li:not(.expanded) span{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}copilot-log-panel ul li button svg{transition:transform .15s cubic-bezier(.2,0,0,1)}copilot-log-panel ul li button[aria-expanded=true] svg{transform:rotate(90deg)}copilot-log-panel ul li code{margin-top:var(--space-50)}copilot-log-panel ul li.expanded .secondary{margin-top:var(--space-100)}copilot-log-panel .secondary a{margin-bottom:var(--space-50);display:block}";
})), F, I, L = e((() => {
	F = () => {
		let e = {
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			fractionalSecondDigits: 3
		}, t, n = navigator.language ?? "", r = n.indexOf("@"), i = r === -1 ? n : n.slice(0, r);
		try {
			t = new Intl.DateTimeFormat(Intl.getCanonicalLocales(i), e);
		} catch (n) {
			console.error("Failed to create date time formatter for ", i, n), t = new Intl.DateTimeFormat("en-US", e);
		}
		return t;
	}, I = F();
}));
//#endregion
//#region frontend/copilot/plugins/copilot-log/copilot-log-plugin.ts
function R(e) {
	return I.format(e);
}
var z, B, V, H, U, W, G;
//#endregion
e((() => {
	c(), b(), a(), j(), S(), T(), o(), n(), h(), s(), P(), k(), D(), x(), L(), v(), V = class {
		constructor() {
			this.showTimestamps = !1, i(this);
		}
		toggleShowTimestamps() {
			this.showTimestamps = !this.showTimestamps;
		}
	}, H = new V(), U = (z = class extends M {
		constructor(...e) {
			super(...e), this.unreadErrors = !1, this.messages = [], this.nextMessageId = 1, this.transitionDuration = 0, this.errorHandlersAdded = !1;
		}
		connectedCallback() {
			if (super.connectedCallback(), this.onCommand("log", (e) => {
				this.handleLogEventData({
					type: e.data.type,
					message: e.data.message
				});
			}), this.onEventBus("log", (e) => this.handleLogEvent(e)), this.onEventBus("update-log", (e) => this.updateLog(e.detail)), this.onEventBus("notification-shown", (e) => this.handleNotification(e)), this.onEventBus("clear-log", () => this.clear()), this.reaction(() => w.sectionPanelResizing, () => {
				this.requestUpdate();
			}), this.transitionDuration = parseInt(window.getComputedStyle(this).getPropertyValue("--dev-tools-transition-duration"), 10), !this.errorHandlersAdded) {
				let e = (e) => {
					d(() => {
						_.attentionRequiredPanelTag = "copilot-log-panel";
					}), this.log(t.ERROR, e.message, !!e.internal, e.details, e.link);
				};
				A((t) => {
					e(t);
				}), O.forEach((t) => {
					e(t);
				}), O.length = 0, this.errorHandlersAdded = !0;
			}
		}
		clear() {
			this.messages = [];
		}
		handleNotification(e) {
			this.log(e.detail.type, e.detail.message, !0, e.detail.details, e.detail.link);
		}
		handleLogEvent(e) {
			this.handleLogEventData(e.detail);
		}
		handleLogEventData(e) {
			this.log(e.type, e.message, !!e.internal, e.details, e.link, r(e.expandedMessage), r(e.expandedDetails), e.id);
		}
		activate() {
			this.unreadErrors = !1, this.updateComplete.then(() => {
				let e = this.renderRoot.querySelector(".message:last-child");
				e && e.scrollIntoView();
			});
		}
		render() {
			return u`
      <style>
        ${N}
      </style>
      ${this.messages.length === 0 ? u`<div
            class="bg-blue-3 dark:bg-blue-5 gap-2 flex mb-3 mt-0 mx-3 pe-3 ps-2 py-2 rounded-md text-blue-11 dark:text-blue-12 text-sm">
            <vaadin-icon .svg="${l.info}"></vaadin-icon>
            <span
              >Communication between application and backend services, errors, and all notifications will appear
              here.</span
            >
          </div>` : u`<ul>
            ${this.messages.map((e) => this.renderMessage(e))}
          </ul>`}
    `;
		}
		renderMessage(e) {
			let n, i;
			return e.type === t.ERROR ? (i = l.warning, n = "Error") : e.type === t.WARNING ? (i = l.warning, n = "Warning") : (i = l.info, n = "Info"), u`
      <li
        class="${e.type} ${e.expanded ? "expanded" : ""} ${e.details || e.link ? "has-details" : ""}"
        data-id="${e.id}">
        <span aria-label="${n}" class="icon" title="${n}">${i}</span>
        <span class="message" @click=${() => this.toggleExpanded(e)}>
          <span class="timestamp" ?hidden=${!H.showTimestamps}>${R(e.timestamp)}</span>
          <span class="primary">
            ${e.expanded && e.expandedMessage ? e.expandedMessage : e.message}
          </span>
          ${e.expanded ? u` <span class="secondary"> ${e.expandedDetails ?? e.details} </span>` : u` <span class="secondary" ?hidden="${!e.details && !e.link}">
                ${r(e.details)}
                ${e.link ? u` <a href="${e.link}" target="_blank">Learn more</a>` : ""}
              </span>`}
        </span>
        <!-- TODO: a11y, button needs aria-controls with unique ids -->
        <button
          aria-controls="content"
          aria-expanded="${e.expanded}"
          aria-label="Expand details"
          class="icon"
          @click=${() => this.toggleExpanded(e)}
          ?hidden=${!this.canBeExpanded(e)}>
          <span>${l.chevronRight}</span>
        </button>
      </li>
    `;
		}
		log(e, n, r, i, a, o, s, c) {
			let l = this.nextMessageId;
			this.nextMessageId += 1, s ||= n;
			let u = {
				id: l,
				type: e,
				message: n,
				details: i,
				link: a,
				dontShowAgain: !1,
				deleted: !1,
				expanded: !1,
				expandedMessage: o,
				expandedDetails: s,
				timestamp: /* @__PURE__ */ new Date(),
				internal: r,
				userId: c
			};
			for (this.messages.push(u); this.messages.length > B.MAX_LOG_ROWS;) this.messages.shift();
			return this.requestUpdate(), this.updateComplete.then(() => {
				let n = this.renderRoot.querySelector(".message:last-child");
				n ? (setTimeout(() => n.scrollIntoView({ behavior: "smooth" }), this.transitionDuration), this.unreadErrors = !1) : e === t.ERROR && (this.unreadErrors = !0);
			}), u;
		}
		updateLog(e) {
			let n = this.messages.find((t) => t.userId === e.id);
			n ||= this.log(t.INFORMATION, "<Log message to update was not found>", !1), Object.assign(n, e), f(n.expandedDetails) && (n.expandedDetails = r(n.expandedDetails)), this.requestUpdate();
		}
		updated() {
			let e = this.querySelector(".row:last-child");
			e && this.isTooLong(e.querySelector(".firstrowmessage")) && e.querySelector("button.expand")?.removeAttribute("hidden");
		}
		toggleExpanded(e) {
			this.canBeExpanded(e) && (e.expanded = !e.expanded, this.requestUpdate()), E("use-log", { source: "toggleExpanded" });
		}
		canBeExpanded(e) {
			if (e.expandedMessage || e.expanded) return !0;
			let t = this.querySelector(`[data\\-id="${e.id}"]`)?.querySelector(".firstrowmessage");
			return this.isTooLong(t);
		}
		isTooLong(e) {
			return e && e.offsetWidth < e.scrollWidth;
		}
	}, B = z, z.MAX_LOG_ROWS = 1e3, z), p([g()], U.prototype, "unreadErrors", void 0), p([g()], U.prototype, "messages", void 0), U = B = p([m("copilot-log-panel")], U), W = class extends y {
		createRenderRoot() {
			return this;
		}
		render() {
			return u`
      <style>
        copilot-log-panel-actions {
          display: contents;
        }
      </style>
      <vaadin-button
        aria-label="Clear log"
        @click=${() => {
				C.emit("clear-log", {});
			}}
        theme="icon tertiary">
        <vaadin-icon .svg="${l.delete}"></vaadin-icon>
        <vaadin-tooltip slot="tooltip" text="Clear log"></vaadin-tooltip>
      </vaadin-button>
      <vaadin-button
        aria-label="Toggle timestamps"
        @click=${() => {
				H.toggleShowTimestamps();
			}}
        theme="icon tertiary">
        <vaadin-icon .svg="${H.showTimestamps ? l.schedule : l.historyToggleOff}"></vaadin-icon>
        <vaadin-tooltip slot="tooltip" text="Toggle timestamps"></vaadin-tooltip>
      </vaadin-button>
    `;
		}
	}, W = p([m("copilot-log-panel-actions")], W), G = {
		header: "Log",
		tag: "copilot-log-panel",
		actionsTag: "copilot-log-panel-actions",
		individual: !0,
		toolbarOptions: {
			allowedModesWithOrder: { common: 0 },
			iconKey: "terminal"
		}
	}, window.Vaadin.copilot.plugins.push({ init(e) {
		e.addPanel(G);
	} }), _.addPanel(G);
}))();
export { W as Actions, U as CopilotLogPanel };
