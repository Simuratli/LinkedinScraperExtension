import React from "react";
import { Download } from "../";
import { DOWNLOAD_TYPE } from "../../types/global.types";
import "../../style/components/userSearchHeading.scss";

const UserSearchHeading = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return (
    <div className="userSearchHeading">
      <h1>
        <span>Search:</span> {urlParams.get("keywords")}
      </h1>
      <div className="userSearchHeading__actions">
        <Download type={DOWNLOAD_TYPE.ALL} />
        <Download type={DOWNLOAD_TYPE.ALL} cvs />
      </div>
    </div>
  );
};

export default UserSearchHeading;
