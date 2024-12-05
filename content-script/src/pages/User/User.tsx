import React from "react";
import { Information, Profile } from "../../containers";
import "../../style/pages/user.scss";
const User = () => {
  return (
    <div className="user">
      <Profile />
      <Information />
    </div>
  );
};

export default User;
