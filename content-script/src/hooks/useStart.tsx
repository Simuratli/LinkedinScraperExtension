import { useEffect } from "react";
import { useStore } from "../store";
import { MainUserDataType } from "../types/global.types";
import { usePaging } from "./usePaging";
import { UserDetails } from "../store/userDetails";

export const useStart = () => {
  const {
    setProfileImage,
    setAll,
    setReset,
    setOpenSidebar,
    setUserCollectedDetails,
    setResetDetails,
  } = useStore();
  const { Paging, scrapeUserInSearch } = usePaging();
  const scrapeImage = () => {
    const profileImage = document
      .querySelector(".pv-top-card__photo-wrapper")
      ?.querySelector("img")?.src
      ? document
          .querySelector(".pv-top-card__photo-wrapper")
          ?.querySelector("img")?.src
      : document.querySelector(".pv-top-card__photo")?.querySelector("img")
          ?.src;

    setProfileImage(
      profileImage
        ? profileImage
        : "https://www.whiteroomstudio.com.sg/wordpress/wp-content/uploads/2021/10/professional-headshot-photography-linkedin-singapore-5.jpeg",
    );
  };

  const updateUserData = (data: MainUserDataType) => {
    setAll(data);
  };

  useEffect(() => {
    const messageListener = (message: {
      type: string;
      data: MainUserDataType & UserDetails;
      error: string;
    }) => {
      if (message.type === "PROFILE_DATA_RESULT") {
        // Handle the profile data
        updateUserData(message.data);
        // You can send this to your React component or process it further
      } else if (message.type === "PROFILE_DATA_ERROR") {
        console.error("Error fetching profile data:", message.error);
      } else if (message.type === "PAGE_UPDATED") {
        setReset();
        setResetDetails();
        setOpenSidebar(false);
        Paging();
        setTimeout(() => {
          scrapeImage();
          scrapeUserInSearch();
        }, 1000);
      } else if (message.type === "SEARCH_PROFILE_DATA_RESULT") {
        const userData = message.data as UserDetails;
        setUserCollectedDetails(userData);
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    const profileId = window.location.pathname.match(/\/in\/([^/]+)/)?.[1];
    if (profileId) {
      chrome.runtime.sendMessage({
        type: "FETCH_PROFILE",
        profileId: profileId,
      });
    }

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  return {
    scrapeImage,
  };
};
