import React from "react";
import { HeaderPropTypes } from "./Header.types";
import "../../style/components/header.scss";

const Header = ({ title }: HeaderPropTypes) => {
  return <h1 className="header">{title}</h1>;
};

export default Header;
