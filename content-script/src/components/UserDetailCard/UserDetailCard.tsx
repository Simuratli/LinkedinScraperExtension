import React, { useState } from "react";
import { UserDetails } from "../../store/userDetails";
import { ChevronDownIcon } from "../../assets";
import "../../style/components/userDetailsCard.scss";
import { Avatar } from "../";

const UserDetailCard = ({ user }: { user: UserDetails }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="userDetailCard">
      <div
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        className="userDetailCard__heading"
      >
        <h1>
          <Avatar
            small
            alt=""
            source="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
          />{" "}
          {user.firstName} {user.lastName}{" "}
        </h1>
        <span style={{ rotate: `${open ? "180deg" : "0deg"}` }}>
          <ChevronDownIcon />
        </span>
      </div>
      <div className={`userDetailCard__content ${open && "open"}`}>
        <table>
          {user.company && (
            <tr>
              <td>Company</td>
              <td>{user.company}</td>
            </tr>
          )}
          {user.email && (
            <tr>
              <td>Email</td>
              <td>{user.email}</td>
            </tr>
          )}
          {user.birthDate && (
            <tr>
              <td>Birthdate</td>
              <td>{user.birthDate}</td>
            </tr>
          )}
          {user.mobile && (
            <tr>
              <td>Mobile</td>
              <td>{user.mobile}</td>
            </tr>
          )}
          {user.publicIdentifier && (
            <tr>
              <td>Public Identifier</td>
              <td>{user.publicIdentifier}</td>
            </tr>
          )}
          {user.headline && (
            <tr>
              <td>Headline</td>
              <td>{user.headline}</td>
            </tr>
          )}
          {user.summary && (
            <tr>
              <td>Summary</td>
              <td>{user.summary}</td>
            </tr>
          )}
        </table>
      </div>
    </div>
  );
};

export default UserDetailCard;
