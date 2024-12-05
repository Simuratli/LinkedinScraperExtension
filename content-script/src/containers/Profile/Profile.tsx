import React from "react";
import { Avatar, Header, Copy, Download } from "../../components";
import { useStore } from "../../store";
import { DOWNLOAD_TYPE } from "../../types/global.types";

const Profile = () => {
  const { profileImage, firstName, lastName } = useStore();

  return (
    <div className="unkai-yt-content-header">
      <Avatar alt={`${firstName} ${lastName}`} source={profileImage} />
      <div className="unkai-yt-content-header-detail">
        <Header title={`${firstName} ${lastName}`} />
        <div className="unkai-yt-content-header-detail-icons">
          <Copy />
          <Download type={DOWNLOAD_TYPE.HALF} />
          <Download type={DOWNLOAD_TYPE.HALF} cvs />
        </div>
      </div>
    </div>
  );
};

export default Profile;
