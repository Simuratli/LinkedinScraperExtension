export interface MainUserDataType {
  MOBILE: string;
  birthDate: string;
  company: string;
  email: string;
  firstName: string;
  headline: string;
  lastName: string;
  publicIdentifier: string;
  summary: string;
}

export enum LINKEDIN_PAGE_ENUM {
  USER = "https://www.linkedin.com/in/",
  USER_SEARCH = "https://www.linkedin.com/search/results/people",
}

export enum PAGING_ENUM {
  NOT = "NOT",
  USER = "USER",
  USER_SEARCH = "USER_SEARCH",
}

export enum DOWNLOAD_TYPE {
  ALL = "ALL",
  HALF = "HALF",
}
