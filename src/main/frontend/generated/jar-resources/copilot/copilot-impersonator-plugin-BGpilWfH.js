import { n as e } from "./chunk-DiqZc92J.js";
import { L as t, Q as n, R as r, et as i, n as a, r as o, t as s, u as c } from "./icons-DoMJjP82.js";
import { a as l, d as u, l as d, n as f, o as p, s as m, t as h } from "./section-panel-ui-state-QV2-K89y.js";
import { n as g, t as _ } from "./copilot-stored-machine-state-DS3t0BPl.js";
import { n as v, t as y } from "./early-project-state-D-4_8bD-.js";
import { n as b, t as x } from "./base-panel-DSO7zZ78.js";
//#region frontend/copilot/application-user-switcher.ts
function S(e) {
	return r("copilot-switch-user", { username: e }, (e) => e.data.error ? {
		success: !1,
		errorMessage: e.data.error.message
	} : { success: !0 });
}
var C = e((() => {
	t();
})), w, T = e((() => {
	w = "copilot-impersonator{flex-direction:column;height:100%;display:flex;overflow:auto}.impersonator-container{gap:var(--lumo-space-l);padding:var(--lumo-space-m);flex-direction:column;display:flex}.impersonator-section{gap:var(--lumo-space-s);flex-direction:column;display:flex}.section-title{font-size:var(--lumo-font-size-m);color:var(--lumo-body-text-color);margin:0;font-weight:600}.section-description{font-size:var(--lumo-font-size-s);color:var(--lumo-secondary-text-color);margin:0}.username-field{width:100%}.recent-users-list{gap:var(--lumo-space-xs);flex-direction:column;display:flex}.recent-user-item{align-items:center;gap:var(--lumo-space-xs);border-radius:var(--lumo-border-radius-m);background-color:var(--lumo-contrast-5pct);padding:var(--lumo-space-xs);display:flex}.recent-user-button{flex:1;justify-content:flex-start;margin:0}.empty-state{text-align:center;padding:var(--lumo-space-xl);justify-content:center;align-items:center;gap:var(--lumo-space-m);flex-direction:column;min-height:300px;display:flex}.empty-icon{width:64px;height:64px;color:var(--lumo-contrast-30pct)}.empty-state h3{font-size:var(--lumo-font-size-l);color:var(--lumo-body-text-color);margin:0;font-weight:600}.empty-state p{font-size:var(--lumo-font-size-s);color:var(--lumo-secondary-text-color);max-width:400px;margin:0}";
})), E, D;
//#endregion
e((() => {
	o(), m(), i(), b(), a(), C(), _(), v(), h(), T(), p(), E = class extends x {
		constructor(...e) {
			super(...e), this.username = "", this.errorMessage = "", this.isLoading = !1, this.handleKeyDown = async (e) => {
				e.key === "Enter" && this.username && !this.isLoading && await this.handleSwitchUser();
			}, this.handleSwitchUser = async () => {
				if (!(!this.username || this.isLoading)) {
					this.isLoading = !0, this.errorMessage = "";
					try {
						let e = await S(this.username);
						e.success ? (g.addRecentSwitchedUsername(this.username), window.location.reload()) : (this.errorMessage = e.errorMessage, this.isLoading = !1);
					} catch {
						this.errorMessage = "An unexpected error occurred", this.isLoading = !1;
					}
				}
			}, this.switchToRecentUser = async (e) => {
				this.username = e, await this.handleSwitchUser();
			}, this.removeRecentUser = (e, t) => {
				t.stopPropagation(), g.removeRecentSwitchedUsername(e), this.requestUpdate();
			};
		}
		connectedCallback() {
			super.connectedCallback(), this.reaction(() => g.getRecentSwitchedUsernames(), () => {
				this.requestUpdate();
			});
		}
		render() {
			if (!y.springSecurityEnabled) return c`
        <style>
          ${w}
        </style>
        <div class="impersonator-container">
          <div class="empty-state">
            <vaadin-icon class="empty-icon" .svg="${s.accountCircle}"></vaadin-icon>
            <h3>Spring Security Not Enabled</h3>
            <p>User impersonation requires Spring Security to be configured in your application.</p>
          </div>
        </div>
      `;
			let e = g.getRecentSwitchedUsernames();
			return c`
      <style>
        ${w}
      </style>
      <div class="impersonator-container">
        <div class="impersonator-section">
          <h3 class="section-title">Switch to User</h3>
          <p class="section-description">Enter a username to impersonate in your application.</p>

          <vaadin-text-field
            class="username-field"
            label="Username"
            placeholder="Enter username"
            .value="${this.username}"
            .errorMessage="${this.errorMessage}"
            .invalid="${this.errorMessage !== ""}"
            ?disabled="${this.isLoading}"
            @value-changed="${(e) => {
				this.username = e.detail.value, this.errorMessage = "";
			}}"
            @keydown="${this.handleKeyDown}">
            <vaadin-icon slot="prefix" .svg="${s.accountCircle}"></vaadin-icon>
          </vaadin-text-field>

          <vaadin-button
            theme="primary"
            ?disabled="${!this.username || this.isLoading}"
            @click="${this.handleSwitchUser}">
            ${this.isLoading ? "Switching..." : "Switch User"}
          </vaadin-button>
        </div>

        ${e.length > 0 ? c`
              <div class="impersonator-section">
                <h3 class="section-title">Recently Used Usernames</h3>
                <div class="recent-users-list">
                  ${e.map((e) => c`
                      <div class="recent-user-item">
                        <vaadin-button
                          class="recent-user-button"
                          theme="tertiary"
                          @click="${() => this.switchToRecentUser(e)}">
                          <vaadin-icon slot="prefix" .svg="${s.accountCircle}"></vaadin-icon>
                          ${e}
                        </vaadin-button>
                        <vaadin-button
                          theme="icon tertiary"
                          aria-label="Remove ${e}"
                          @click="${(t) => this.removeRecentUser(e, t)}">
                          <vaadin-icon .svg="${s.delete}"></vaadin-icon>
                          <vaadin-tooltip slot="tooltip" text="Remove from recent"></vaadin-tooltip>
                        </vaadin-button>
                      </div>
                    `)}
                </div>
              </div>
            ` : ""}
      </div>
    `;
		}
	}, l([d()], E.prototype, "username", void 0), l([d()], E.prototype, "errorMessage", void 0), l([d()], E.prototype, "isLoading", void 0), E = l([u("copilot-impersonator")], E), D = {
		header: "Impersonate User",
		tag: n.IMPERSONATOR,
		individual: !0,
		toolbarOptions: {
			allowedModesWithOrder: { common: 0 },
			iconKey: "accountCircle"
		}
	}, window.Vaadin.copilot.plugins.push({ init(e) {
		e.addPanel(D);
	} }), f.addPanel(D);
}))();
export { E as CopilotImpersonatorPanel };
