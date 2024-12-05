// @ts-nocheck

interface ProfileData {
  firstName?: string;
  lastName?: string;
  headline?: string;
  company?: string;
  email?: string;
  publicIdentifier?: string;
}

interface LinkedInAPIResponse {
  included: any[];
  data: any;
}

chrome.webNavigation.onHistoryStateUpdated.addListener(
  (details) => {
    // Send a message to the content script with the new URL
    chrome.tabs.sendMessage(details.tabId, { type: "PAGE_UPDATED" });
  },
  { url: [{ urlMatches: ".*" }] },
);

class LinkedInAPIService {
  private async getCookiesFromTab(
    tabId: number,
  ): Promise<{ [key: string]: string }> {
    const cookies = await chrome.cookies.getAll({
      url: "https://www.linkedin.com",
    });
    return cookies.reduce(
      (acc, cookie) => {
        acc[cookie.name] = cookie.value;
        return acc;
      },
      {} as { [key: string]: string },
    );
  }

  private getHeaders(
    csrfToken: string,
    cookies: { [key: string]: string },
  ): Headers {
    return new Headers({
      accept: "application/vnd.linkedin.normalized+json+2.1",
      "csrf-token": csrfToken,
      "x-li-lang": "en_US",
      "x-restli-protocol-version": "2.0.0",
      "x-li-track": '{"clientVersion":"1.12","mpVersion":"1.12"}',
      cookie: this.formatCookies(cookies),
    });
  }

  private formatCookies(cookies: { [key: string]: string }): string {
    return Object.entries(cookies)
      .map(([name, value]) => `${name}=${value}`)
      .join("; ");
  }

  private async makeRequest(url: string, headers: Headers): Promise<any> {
    const response = await fetch(url, {
      headers,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`LinkedIn API Error: ${response.status}`);
    }

    return response.json();
  }

  async fetchProfileData(
    profileId: string,
    tabId: number,
  ): Promise<ProfileData> {
    try {
      const cookies = await this.getCookiesFromTab(tabId);
      const csrfToken = cookies["JSESSIONID"]?.replace(/"/g, "");

      if (!csrfToken) {
        throw new Error(
          "CSRF token not found. Please make sure you are logged into LinkedIn.",
        );
      }

      const headers = this.getHeaders(csrfToken, cookies);

      // Fetch basic profile data
      const profileUrl = `https://www.linkedin.com/voyager/api/identity/profiles/${profileId}/profileView`;
      const profileResponse: LinkedInAPIResponse = await this.makeRequest(
        profileUrl,
        headers,
      );

      // Fetch contact info
      const contactUrl = `https://www.linkedin.com/voyager/api/identity/profiles/${profileId}/profileContactInfo`;
      const contactResponse: LinkedInAPIResponse = await this.makeRequest(
        contactUrl,
        headers,
      );

      return this.processAPIResponse(profileResponse, contactResponse);
    } catch (error) {
      console.error("Error fetching LinkedIn data:", error);
      throw error;
    }
  }

  private processAPIResponse(
    profileResponse: LinkedInAPIResponse,
    contactResponse: LinkedInAPIResponse,
  ): ProfileData {
    const included = profileResponse.included || [];
    const contactInfo = contactResponse.data || [];
    const profileData: ProfileData = {};

    // Process basic profile information
    for (const item of included) {
      if (item.firstName) profileData.firstName = item.firstName;
      if (item.lastName) profileData.lastName = item.lastName;
      if (item.headline) profileData.headline = item.headline;
      if (item.address) profileData.adress = item.adress;
      if (item.summary) profileData.summary = item.summary;
      if (item.birthDate)
        profileData.birthDate = `${item.birthDate.day}/${item.birthDate.month}`;

      if ("miniCompany" in item || "*miniCompany" in item) {
        const numberSplit = item.entityUrn.split(",")[1];
        if (numberSplit.split(")")[0] === "0") {
          profileData.company = item.name;
        }
      }
      if (item.publicIdentifier)
        profileData.publicIdentifier = item.publicIdentifier;
    }

    // Process contact information

    if (contactInfo.phoneNumbers && contactInfo.phoneNumbers.lenght !== 0) {
      for (const item of contactInfo.phoneNumbers) {
        profileData[item.type] = item.number;
      }
    }

    if (contactInfo.emailAddress) profileData.email = contactInfo.emailAddress;

    return profileData;
  }
}

// Initialize the service
const linkedInService = new LinkedInAPIService();

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "FETCH_PROFILE" && sender.tab?.id) {
    const tabId = sender.tab.id;
    const profileId = message.profileId;
    linkedInService
      .fetchProfileData(profileId, tabId)
      .then((profileData) => {
        // Send data back to content script
        chrome.tabs.sendMessage(tabId, {
          type: "PROFILE_DATA_RESULT",
          data: profileData,
        });
      })
      .catch((error) => {
        chrome.tabs.sendMessage(tabId, {
          type: "PROFILE_DATA_ERROR",
          error: error.message,
        });
      });

    // Return true to indicate we'll respond asynchronously
    return true;
  }

  if (message.type === "FETCH_PROFILE_SEARCH" && sender.tab?.id) {
    const tabId = sender.tab.id;
    const profileId = message.profileId;
    linkedInService
      .fetchProfileData(profileId, tabId)
      .then((profileData) => {
        // Send data back to content script
        chrome.tabs.sendMessage(tabId, {
          type: "SEARCH_PROFILE_DATA_RESULT",
          data: profileData,
        });
      })
      .catch((error) => {
        chrome.tabs.sendMessage(tabId, {
          type: "PROFILE_DATA_ERROR",
          error: error.message,
        });
      });

    // Return true to indicate we'll respond asynchronously
    return true;
  }
});

// Handle tab updates to check for LinkedIn profile pages
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url?.includes("linkedin.com/in/")
  ) {
    // Extract profile ID from URL
    const profileId = tab.url.match(/\/in\/([^/]+)/)?.[1];
    if (profileId) {
      linkedInService
        .fetchProfileData(profileId, tabId)
        .then((profileData) => {
          chrome.tabs.sendMessage(tabId, {
            type: "PROFILE_DATA_RESULT",
            data: profileData,
          });
        })
        .catch((error) => {
          chrome.tabs.sendMessage(tabId, {
            type: "PROFILE_DATA_ERROR",
            error: error.message,
          });
        });
    }
  }
});
