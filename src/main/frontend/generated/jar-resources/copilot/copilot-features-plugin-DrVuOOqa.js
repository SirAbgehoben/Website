import { n as e } from "./chunk-DiqZc92J.js";
import { $ as t, et as n, n as r, o as i, r as a, t as o, u as s } from "./icons-DoMJjP82.js";
import { a as c, d as l, i as u, l as d, o as f, r as p, s as m } from "./section-panel-ui-state-QV2-K89y.js";
import { n as h, r as g } from "./copilot-ui-state-DjlBBpyf.js";
import { r as _, t as v } from "./stats-BSuRK33k.js";
import { c as y, l as b, o as x, r as S, u as C } from "./copilot-error-handler-DrF5aMdz.js";
import { n as w, t as T } from "./copilot-stored-machine-state-DS3t0BPl.js";
import { n as E, r as D } from "./copilot-notification-BnxWYvla.js";
import { n as O, t as k } from "./base-panel-DSO7zZ78.js";
//#region frontend/copilot/shared/copilot-experimental-features.ts
var A, j, M, N, P, F, I, L = e((() => {
	T(), g(), A = (e) => h.userInfo?.copilotExperimentalFeatureFlag === !0 && w.isExperimentalFeatureEnabled(e), j = {
		id: "theme-from-image",
		name: "Theme from Image",
		description: "Generate a custom theme based on an image you provide.",
		enabled: () => A(j),
		available: () => h.appTheme === "lumo",
		requiresReload: !1
	}, M = {
		id: "ai-docs-assistant",
		name: "AI Docs Assistant",
		description: "AI-powered Vaadin documentation assistant.",
		enabled: () => A(M),
		available: () => !0,
		requiresReload: !1
	}, N = {
		id: "testbench-test-recorder",
		name: "TestBench Test Recorder",
		description: "Record user interactions to generate end-to-end Vaadin TestBench tests automatically.",
		enabled: () => A(N),
		available: () => !0,
		requiresReload: !0
	}, P = {
		id: "i18n",
		name: "Internationalization",
		description: "Edit and manage translations for your application.",
		enabled: () => A(P),
		available: () => !0,
		requiresReload: !0
	}, F = {
		id: "annotations",
		name: "Annotations",
		description: "Add and manage comments and annotations on your application views.",
		enabled: () => A(F),
		available: () => !0,
		requiresReload: !0
	}, I = [
		j,
		M,
		N,
		P,
		F
	];
})), R, z, B, V;
//#endregion
e((() => {
	x(), v(), a(), m(), L(), E(), n(), T(), g(), y(), r(), u(), O(), f(), R = window.Vaadin.devTools, z = class extends k {
		constructor(...e) {
			super(...e), this.toggledFeaturesThatAreRequiresServerRestart = [];
		}
		connectedCallback() {
			super.connectedCallback(), this.classList.add("contents");
		}
		render() {
			let e = h.userInfo?.copilotExperimentalFeatureFlag;
			return s`
      <div class="flex flex-col gap-6 px-4 py-0.5">
        <div class="border-dashed flex flex-col divide-y">
          ${h.featureFlags.slice().sort((e, t) => e.title.localeCompare(t.title)).map((e) => s`
                <div class="flex gap-2 justify-between py-3.5">
                  <div class="flex flex-col">
                    <label id="${e.id}-label">${e.title}</label>
                    <a
                      class="flex gap-0.5 text-xs"
                      href="${e.moreInfoLink}"
                      id="${e.id}-desc"
                      target="_blank"
                      rel="noopener noreferrer"
                      >More info<vaadin-icon class="icon-sm" .svg="${o.arrowOutward}"></vaadin-icon
                    ></a>
                  </div>
                  <copilot-toggle-button
                    accessible-name-ref="${e.id}-label"
                    accessible-desc-ref="${e.id}-desc"
                    ?checked=${e.enabled}
                    @on-change=${(t) => this.toggleFeatureFlag(t, e)}>
                  </copilot-toggle-button>
                </div>
              `)}
        </div>
        <div class="flex flex-col gap-1">
          ${e ? s`<h3 class="font-semibold my-0 text-sm">Copilot Experimental Features</h3>
                <div class="border-dashed flex flex-col divide-y">
                  ${I.filter((e) => e.available()).slice().sort((e, t) => e.name.localeCompare(t.name)).map((e) => s`
                        <div class="flex gap-2 justify-between py-3.5">
                          <div class="flex flex-col">
                            <label id="${e.id}-label">${e.description}</label>
                          </div>
                          <copilot-toggle-button
                            accessible-name-ref="${e.id}-label"
                            ?checked=${w.isExperimentalFeatureEnabled(e)}
                            @on-change=${(t) => this.toggleExperimentalFeatureFlag(t, e)}>
                          </copilot-toggle-button>
                        </div>
                      `)}
                </div>` : i}
        </div>
      </div>
    `;
		}
		toggleFeatureFlag(e, n) {
			let r = e.target.checked;
			_("use-feature", {
				source: "toggle",
				enabled: r,
				id: n.id
			}), R.frontendConnection ? (R.frontendConnection.send("setFeature", {
				featureId: n.id,
				enabled: r
			}), n.requiresServerRestart && h.toggleServerRequiringFeatureFlag(n), D({
				type: t.INFORMATION,
				message: `“${n.title}” ${r ? "enabled" : "disabled"}`,
				details: n.requiresServerRestart ? S() : void 0,
				dismissId: `feature${n.id}${r ? "Enabled" : "Disabled"}`
			}), n.id === "copilotExperimentalFeatures" && h.userInfo && h.setUserInfo({
				...h.userInfo,
				copilotExperimentalFeatureFlag: r
			})) : R.log("error", `Unable to toggle feature ${n.title}: No server connection available`);
		}
		toggleExperimentalFeatureFlag(e, t) {
			let n = e.target.checked;
			_("use-experimental-feature", {
				source: "toggle",
				enabled: n,
				id: t.id
			});
			let r = w.isExperimentalFeatureEnabled(t);
			w.setExperimentalFeatureEnabled(t, n), t.requiresReload && n && !r && window.location.reload();
		}
	}, c([d()], z.prototype, "toggledFeaturesThatAreRequiresServerRestart", void 0), z = c([l("copilot-features-panel")], z), B = class extends p {
		constructor(...e) {
			super(...e), this.serverRestarting = !1;
		}
		createRenderRoot() {
			return this;
		}
		render() {
			if (h.serverRestartRequiringToggledFeatureFlags.length === 0 || !C()) return i;
			let e = this.serverRestarting ? "Restarting..." : "Click to restart server";
			return s`
      <button
        ?disabled="${this.serverRestarting}"
        id="restart-server-btn"
        class="icon ${this.serverRestarting ? "" : "fade-in-out"}"
        @click=${() => {
				this.serverRestarting = !0, b();
			}}>
        <span>${o.refresh}</span>
      </button>
      <vaadin-tooltip for="restart-server-btn" text=${e}></vaadin-tooltip>
    `;
		}
	}, c([d()], B.prototype, "serverRestarting", void 0), B = c([l("copilot-features-actions")], B), V = {
		header: "Features",
		tag: "copilot-features-panel",
		helpUrl: "https://vaadin.com/docs/latest/flow/configuration/feature-flags",
		actionsTag: "copilot-features-actions",
		toolbarOptions: {
			allowedModesWithOrder: { common: 0 },
			iconKey: "listAlt"
		}
	}, window.Vaadin.copilot.plugins.push({ init(e) {
		e.addPanel(V);
	} });
}))();
export { B as CopilotFeaturesActions, z as CopilotFeaturesPanel };
