import React, { useState } from "react";
import { DocumentIcon, TableIcon } from "../../assets";
import "../../style/components/copy.scss";
import { useStore } from "../../store";
import { DownloadPropTypes } from "./Download.types";
import { DOWNLOAD_TYPE } from "../../types/global.types";
const Download = ({ type, cvs }: DownloadPropTypes) => {
  const {
    company,
    email,
    birthDate,
    firstName,
    headline,
    lastName,
    mobile,
    summary,
    profileImage,
    userCollectedDetails,
  } = useStore();
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };
  const [showTooltip, setShowTooltip] = useState(false);

  const handleDownload = () => {
    const formattedText =
      type === DOWNLOAD_TYPE.HALF
        ? `
    Name: ${firstName} ${lastName}
    Date of Birth: ${birthDate}
    Company: ${company}
    Email: ${email}
    Mobile: ${mobile}
    Headline: ${headline}
    Profile Image URL: ${profileImage}
    Summary: ${summary}
        `
        : userCollectedDetails
            .map(
              (user) => `
    Name: ${user.firstName} ${user.lastName}
    Date of Birth: ${user.birthDate || "-"}
    Company: ${user.company || "-"}
    Email: ${user.email || "-"}
    Mobile: ${user.mobile || "-"}
    Headline: ${user.headline || "-"}
    Profile Image URL: ${user.profileImage || "-"}
    Summary: ${user.summary || "-"}
      `,
            )
            .join("\n");

    // Create a Blob for the formatted text
    const blob = new Blob([formattedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob); // Generate a temporary URL
    const link = document.createElement("a"); // Create a temporary anchor element
    link.href = url;
    link.download = `${type === DOWNLOAD_TYPE.ALL ? "all" : `${firstName} ${lastName}`}.linkedin.txt`; // Set the file name
    link.click(); // Trigger the download
    URL.revokeObjectURL(url); // Clean up the temporary URL
  };

  const handleDownloadasCvs = () => {
    const formattedCSV =
      type === DOWNLOAD_TYPE.HALF
        ? `Name,Date of Birth,Company,Email,Mobile,Headline,Profile Image URL,Summary\n` +
          `"${firstName} ${lastName}","${birthDate}","${company}","${email}","${mobile}","${headline}","${profileImage}","${summary}"`
        : "Name,Date of Birth,Company,Email,Mobile,Headline,Profile Image URL,Summary\n" +
          userCollectedDetails
            .map(
              (user) =>
                `"${user.firstName} ${user.lastName}","${user.birthDate || "-"}","${user.company || "-"}","${user.email || "-"}","${user.mobile || "-"}","${user.headline || "-"}","${user.profileImage || "-"}","${user.summary || "-"}"`,
            )
            .join("\n");

    // Create a Blob for the CSV content
    const blob = new Blob([formattedCSV], { type: "text/csv" });
    const url = URL.createObjectURL(blob); // Generate a temporary URL
    const link = document.createElement("a"); // Create a temporary anchor element
    link.href = url;
    link.download = `${type === DOWNLOAD_TYPE.ALL ? "all" : `${firstName}_${lastName}`}.linkedin.csv`; // Set the file name
    link.click(); // Trigger the download
    URL.revokeObjectURL(url); // Clean up the temporary URL
  };

  return (
    <button
      className="unkai-copy"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={cvs ? handleDownloadasCvs : handleDownload}
    >
      <span className="unkai-copy-icon">
        {" "}
        {cvs ? <TableIcon /> : <DocumentIcon />}
      </span>
      {showTooltip && (
        <div className="unkai-tooltip">Download {cvs ? ".cvs" : ".txt"}</div>
      )}
    </button>
  );
};

export default Download;
