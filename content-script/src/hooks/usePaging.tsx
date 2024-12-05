import React, { useEffect } from "react";
import { LINKEDIN_PAGE_ENUM, PAGING_ENUM } from "../types/global.types";
import { InformationPage, User, UserSearch } from "../pages";
import { useStore } from "../store";

export const usePaging = () => {
  const { setCurrentPage, currentPage } = useStore();
  const Paging = () => {
    if (window.location.href.includes(LINKEDIN_PAGE_ENUM.USER)) {
      setCurrentPage(PAGING_ENUM.USER);
    } else if (window.location.href.includes(LINKEDIN_PAGE_ENUM.USER_SEARCH)) {
      setCurrentPage(PAGING_ENUM.USER_SEARCH);
    } else {
      setCurrentPage(PAGING_ENUM.NOT);
    }
  };

  useEffect(() => {
    Paging();
  }, []);

  const showCurrentPage = () => {
    switch (currentPage) {
      case PAGING_ENUM.USER:
        return <User />;
      case PAGING_ENUM.USER_SEARCH:
        return <UserSearch />;
      default:
        return <InformationPage />;
    }
  };

  const scrapeUserInSearch = () => {
    if (window.location.href.includes(LINKEDIN_PAGE_ENUM.USER_SEARCH)) {
      let userLink: NodeListOf<HTMLAnchorElement> | null = null;

      while (userLink === null) {
        userLink = document.querySelectorAll<HTMLAnchorElement>(
          ".linked-area .t-roman a",
        );

        if (userLink) {
          const urls: string[] = [];

          if (userLink) {
            for (const element of userLink) {
              const username = element.href.split("/in/")[1]?.split("?")[0];
              urls.push(username);

              chrome.runtime.sendMessage({
                type: "FETCH_PROFILE_SEARCH",
                profileId: username,
              });
            }
          }
        }
      }

      //   const userLink = document.querySelectorAll<HTMLAnchorElement>(
      //     ".linked-area .t-roman a",
      //   );
      //   const urls: string[] = [];

      //   if (userLink) {
      //     for (const element of userLink) {
      //       const username = element.href.split("/in/")[1]?.split("?")[0];
      //       urls.push(username);

      //       chrome.runtime.sendMessage({
      //         type: "FETCH_PROFILE_SEARCH",
      //         profileId: username,
      //       });
      //     }
      //   }
    }
  };

  useEffect(() => {
    scrapeUserInSearch();
  }, [currentPage]);

  return { showCurrentPage, Paging, scrapeUserInSearch };
};
