import React from "react";
import { AvatarPropTypes } from "./Avatar.types";
import "../../style/components/avatar.scss";

const Avatar = ({ source, alt, small }: AvatarPropTypes) => {
  return (
    <img className={`avatar ${small && "small"}`} src={source} alt={alt} />
  );
};

export default Avatar;
