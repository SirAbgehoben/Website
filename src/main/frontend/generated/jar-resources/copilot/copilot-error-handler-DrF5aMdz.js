import { n as e } from "./chunk-DiqZc92J.js";
import { $ as t, C as n, L as r, R as i, T as a, ct as o, et as s, it as c, l, o as u, r as d, s as f, u as p, y as m } from "./icons-DoMJjP82.js";
import { l as h, o as g } from "./consts-nuhLqR24.js";
import { n as _, t as v } from "./copilot-eventbus-tR06exIW.js";
import { n as y, r as b } from "./copilot-ui-state-DjlBBpyf.js";
import { t as x } from "./stats-BSuRK33k.js";
import { i as S, n as C, r as w, t as T } from "./directive-CZ105jp5.js";
import { n as E, t as D } from "./copilot-stored-machine-state-DS3t0BPl.js";
import { n as O } from "./copilot-notification-BnxWYvla.js";
import { n as k } from "./early-project-state-D-4_8bD-.js";
//#region node_modules/lit-html/directives/unsafe-html.js
var A, j, M = e((() => {
	l(), w(), A = class extends C {
		constructor(e) {
			if (super(e), this.it = u, e.type !== S.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
		}
		render(e) {
			if (e === u || e == null) return this._t = void 0, this.it = e;
			if (e === f) return e;
			if (typeof e != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
			if (e === this.it) return this._t;
			this.it = e;
			let t = [e];
			return t.raw = t, this._t = {
				_$litType$: this.constructor.resultType,
				strings: t,
				values: []
			};
		}
	}, A.directiveName = "unsafeHTML", A.resultType = 1, j = T(A);
})), N = e((() => {
	M();
}));
//#endregion
//#region frontend/copilot/shared/copilot-userinfo-util.ts
function P() {
	let e = y.userInfo;
	return !e || e.copilotProjectCannotLeaveLocalhost ? !1 : E.isSendErrorReportsAllowed();
}
var F = e((() => {
	x(), b(), $(), D(), n(), O(), s();
}));
//#endregion
//#region frontend/copilot/shared/hotswap-utils.ts
function I() {
	return y.idePluginState?.supportedActions?.find((e) => e === "restartApplication");
}
function L() {
	i(`${g}plugin-restart-application`, {}, () => {}).catch((e) => {
		H("Error restarting server", e);
	});
}
var R = e((() => {
	r(), h(), $(), _(), O(), s(), b(), k();
}));
//#endregion
//#region frontend/copilot/shared/copilot-error-handler.ts
function z(e) {
	if (e === void 0) return !1;
	let t = Object.keys(e);
	return t.length === 1 && t.includes("message") || t.length >= 3 && t.includes("message") && t.includes("exceptionMessage") && t.includes("exceptionStacktrace");
}
function B() {
	let e = "A server restart is required";
	return I() ? m(p`${e} <br />${V()}`) : m(p`${e}`);
}
function V() {
	return I() ? p`<vaadin-button
      theme="primary"
      @click=${(e) => {
		let t = e.target;
		t.disabled = !0, t.innerText = "Restarting...", L();
	}}>
      Restart now
    </vaadin-button>` : u;
}
function H(e, n) {
	let r = z(n) ? n.exceptionMessage ?? n.message : n, i = {
		type: t.ERROR,
		message: "Copilot internal error",
		details: e + (r ? `\n${r}` : "")
	};
	z(n) && n.suggestRestart && I() && (i.details = m(p`${e}<br />${r} ${V()}`), i.delay = 3e4), a(i);
	let o;
	o = n instanceof Error ? n.stack : z(n) ? n?.exceptionStacktrace?.join("\n") : n?.toString(), v.emit("system-info-with-callback", {
		callback: (t) => v.send("copilot-error", {
			message: `Copilot internal error: ${e}`,
			details: o,
			versions: t
		}),
		notify: !1
	});
}
function U(e) {
	return e?.stack?.includes("cdn.vaadin.com/copilot") || e?.stack?.includes("/copilot/copilot/") || e?.stack?.includes("/copilot/copilot-private/");
}
function W() {
	let e = window.onerror;
	window.onerror = (t, n, r, i, a) => {
		if (U(a)) {
			H(t.toString(), a);
			return;
		}
		e && e(t, n, r, i, a);
	}, o((e) => {
		U(e) && H("", e);
	});
	let t = window.Vaadin.ConsoleErrors;
	if (Array.isArray(t)) for (let e of t) Array.isArray(e) ? Q.push(...e) : Q.push(e);
	K((e) => Q.push(e));
}
function G(e, t, n, r, i, a) {
	let o = { ...e }, s = window.Vaadin.copilot.tree, c = window.Vaadin.copilot.customComponentHandler;
	o.nodes.forEach((e) => {
		e.node = s.allNodesFlat.find((t) => {
			if (!t.isFlowComponent) return !1;
			let n = t.node;
			return n.uiId === e.uiId && n.nodeId === e.nodeId;
		});
	});
	let l = [];
	n && l.push(`Error Message -> ${n}`), r && l.push(`Error Details -> ${r}`), l.push(`Active Level -> ${c.getActiveDrillDownContext() ? c.getActiveDrillDownContext()?.nameAndIdentifier : "No active level"}`), o.nodes.length > 0 && (l.push("\nRelevant Nodes:"), o.nodes.forEach((e) => {
		l.push(`${e.relevance} -> ${e.node?.nameAndIdentifier ?? "Node not found"}`);
	})), o.relevantPairs.length > 0 && (l.push("\nAdditional Info:"), o.relevantPairs.forEach((e) => {
		l.push(`${e.relevance} -> ${e.value}`);
	})), a && (l.push("Versions"), l.push(a));
	let u = {
		name: "Info",
		content: l.join("\n")
	};
	o.items.unshift(u), i && o.items.push({
		name: "Stacktrace",
		content: i
	}), v.emit("system-info-with-callback", {
		callback: (e) => {
			o.items.push({
				name: "Versions",
				content: e
			}), t(o);
		},
		notify: !1
	});
}
function K(e) {
	let n = window.Vaadin.ConsoleErrors;
	window.Vaadin.ConsoleErrors = { push: (r) => {
		r[0] === null || r[0] === void 0 || (r[0].type !== void 0 && r[0].message !== void 0 ? e({
			type: r[0].type,
			message: r[0].message,
			internal: !!r[0].internal,
			details: r[0].details,
			link: r[0].link
		}) : e({
			type: t.ERROR,
			message: r.map((e) => q(e)).join(" "),
			internal: !1
		}), n.push(r));
	} };
}
function q(e) {
	return e.message ? e.message.toString() : e.toString();
}
var J, Y, X, Z, Q, $ = e((() => {
	d(), N(), c(), _(), b(), F(), R(), n(), s(), J = (e, t) => e.error ? (Z(e.error, t), !0) : !1, Y = (e, n, r) => {
		a({
			type: t.ERROR,
			message: e,
			details: m(p`<vaadin-details class="flex flex-col w-full" theme="no-padding reverse">
          <vaadin-details-summary class="font-medium -ms-3 self-start text-secondary text-xs" slot="summary"
            >Details</vaadin-details-summary
          >
          <code class="codeblock"
            >${j(n)}<copilot-copy class="absolute end-0 flex top-0"></copilot-copy
          ></code>
        </vaadin-details>
        ${r === void 0 ? u : p`
              <vaadin-button
                class="mt-3"
                @click="${() => {
				r && v.emit("submit-exception-report-clicked", r);
			}}"
                id="report-issue"
                theme="primary"
                >Report Issue</vaadin-button
              >
            `} `),
			delay: 3e4
		});
	}, X = (e, t, n, r, i) => {
		let a = y.newVaadinVersionState?.versions?.length === 0;
		i && a ? G(i, (n) => {
			Y(e, t, n);
		}, e, t, n) : Y(e, t), P() && (r?.templateData && typeof r.templateData == "string" && r.templateData.startsWith("data") && (r.templateData = "<IMAGE_DATA>"), v.emit("system-info-with-callback", {
			callback: (t) => v.send("copilot-error", {
				message: e,
				details: String(n).replace("	", "\n") + (r ? `\n \nRequest: \n${JSON.stringify(r)}\n` : ""),
				versions: t
			}),
			notify: !1
		})), y.clearOperationWaitsHmrUpdate();
	}, Z = (e, t) => {
		X(e.message, e.exceptionMessage ?? "", e.exceptionStacktrace?.join("\n") ?? "", t, e.exceptionReport);
	}, Q = [];
}));
//#endregion
export { J as a, R as c, N as d, j as f, H as i, L as l, Q as n, $ as o, B as r, W as s, K as t, I as u };
