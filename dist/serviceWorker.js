(() => {
  "use strict";
  chrome.webNavigation.onHistoryStateUpdated.addListener(
    (e) => {
      chrome.tabs.sendMessage(e.tabId, { type: "PAGE_UPDATED" });
    },
    { url: [{ urlMatches: ".*" }] },
  );
  const e = new (class {
    async getCookiesFromTab(e) {
      return (
        await chrome.cookies.getAll({ url: "https://www.linkedin.com" })
      ).reduce((e, t) => ((e[t.name] = t.value), e), {});
    }
    getHeaders(e, t) {
      return new Headers({
        accept: "application/vnd.linkedin.normalized+json+2.1",
        "csrf-token": e,
        "x-li-lang": "en_US",
        "x-restli-protocol-version": "2.0.0",
        "x-li-track": '{"clientVersion":"1.12","mpVersion":"1.12"}',
        cookie: this.formatCookies(t),
      });
    }
    formatCookies(e) {
      return Object.entries(e)
        .map(([e, t]) => `${e}=${t}`)
        .join("; ");
    }
    async makeRequest(e, t) {
      const a = await fetch(e, { headers: t, credentials: "include" });
      if (!a.ok) throw new Error(`LinkedIn API Error: ${a.status}`);
      return a.json();
    }
    async fetchProfileData(e, t) {
      try {
        const a = await this.getCookiesFromTab(t),
          s = a.JSESSIONID?.replace(/"/g, "");
        if (!s)
          throw new Error(
            "CSRF token not found. Please make sure you are logged into LinkedIn.",
          );
        const r = this.getHeaders(s, a),
          i = `https://www.linkedin.com/voyager/api/identity/profiles/${e}/profileView`,
          n = await this.makeRequest(i, r),
          o = `https://www.linkedin.com/voyager/api/identity/profiles/${e}/profileContactInfo`,
          c = await this.makeRequest(o, r);
        return this.processAPIResponse(n, c);
      } catch (e) {
        throw (console.error("Error fetching LinkedIn data:", e), e);
      }
    }
    processAPIResponse(e, t) {
      const a = e.included || [],
        s = t.data || [],
        r = {};
      for (const e of a)
        e.firstName && (r.firstName = e.firstName),
          e.lastName && (r.lastName = e.lastName),
          e.headline && (r.headline = e.headline),
          e.address && (r.adress = e.adress),
          e.summary && (r.summary = e.summary),
          e.birthDate &&
            (r.birthDate = `${e.birthDate.day}/${e.birthDate.month}`),
          ("miniCompany" in e || "*miniCompany" in e) &&
            "0" === e.entityUrn.split(",")[1].split(")")[0] &&
            (r.company = e.name),
          e.publicIdentifier && (r.publicIdentifier = e.publicIdentifier);
      if (s.phoneNumbers && 0 !== s.phoneNumbers.lenght)
        for (const e of s.phoneNumbers) r[e.type] = e.number;
      return s.emailAddress && (r.email = s.emailAddress), r;
    }
  })();
  chrome.runtime.onMessage.addListener((t, a, s) => {
    if ("FETCH_PROFILE" === t.type && a.tab?.id) {
      const s = a.tab.id,
        r = t.profileId;
      return (
        e
          .fetchProfileData(r, s)
          .then((e) => {
            chrome.tabs.sendMessage(s, {
              type: "PROFILE_DATA_RESULT",
              data: e,
            });
          })
          .catch((e) => {
            chrome.tabs.sendMessage(s, {
              type: "PROFILE_DATA_ERROR",
              error: e.message,
            });
          }),
        !0
      );
    }
    if ("FETCH_PROFILE_SEARCH" === t.type && a.tab?.id) {
      const s = a.tab.id,
        r = t.profileId;
      return (
        e
          .fetchProfileData(r, s)
          .then((e) => {
            chrome.tabs.sendMessage(s, {
              type: "SEARCH_PROFILE_DATA_RESULT",
              data: e,
            });
          })
          .catch((e) => {
            chrome.tabs.sendMessage(s, {
              type: "PROFILE_DATA_ERROR",
              error: e.message,
            });
          }),
        !0
      );
    }
  }),
    chrome.tabs.onUpdated.addListener((t, a, s) => {
      if ("complete" === a.status && s.url?.includes("linkedin.com/in/")) {
        const a = s.url.match(/\/in\/([^/]+)/)?.[1];
        a &&
          e
            .fetchProfileData(a, t)
            .then((e) => {
              chrome.tabs.sendMessage(t, {
                type: "PROFILE_DATA_RESULT",
                data: e,
              });
            })
            .catch((e) => {
              chrome.tabs.sendMessage(t, {
                type: "PROFILE_DATA_ERROR",
                error: e.message,
              });
            });
      }
    });
})();