import React, { useState } from "react";
import { CopyIcon } from "../../assets";
import { useStore } from "../../store";
import "../../style/components/copy.scss";

const CopyAsJson = () => {
  const {
    birthDate,
    company,
    email,
    firstName,
    headline,
    lastName,
    mobile,
    profileImage,
  } = useStore();

  const handleCopy = () => {
    setCopied(true);
    const json = {
      birthDate,
      company,
      email,
      firstName,
      headline,
      lastName,
      mobile,
      profileImage,
    };
    navigator.clipboard.writeText(JSON.stringify(json));
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const [showTooltip, setShowTooltip] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="unkai-copy"
      onClick={handleCopy}
    >
      <span className="unkai-copy-icon">
        <CopyIcon />
      </span>
      {showTooltip && (
        <div className="unkai-tooltip">{copied ? "Copied" : "Copy"}</div>
      )}
    </button>
  );
};

export default CopyAsJson;
