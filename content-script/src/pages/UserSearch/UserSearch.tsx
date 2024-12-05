import React from "react";
import { useStore } from "../../store";
import { UserDetailCard, UserSearchHeading } from "../../components";
import "../../style/pages/userDetails.scss";
const UserSearch = () => {
  const { userCollectedDetails } = useStore();

  return (
    <div className="userDetails">
      <UserSearchHeading />
      <div className="userDetails__content">
        {userCollectedDetails.map((user) => {
          return <UserDetailCard key={user.publicIdentifier} user={user} />;
        })}
      </div>
    </div>
  );
};

export default UserSearch;
