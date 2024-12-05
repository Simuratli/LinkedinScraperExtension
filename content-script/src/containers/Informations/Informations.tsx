import React from "react";
import { Input, Textarea } from "../../components";
import { useStore } from "../../store";

const Informations = () => {
  const {
    summary,
    birthDate,
    company,
    email,
    firstName,
    headline,
    lastName,
    mobile,
    publicIdentifier,
    setFirstName,
    setSummary,
    setCompany,
    setHeadline,
  } = useStore();

  return (
    <div className="unkai-yt-content-inner">
      <div className="unkai-yt-content-inner-inputs">
        <Input
          label={"Firstname"}
          id="firstname"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          name="firstname"
        />
        <Input
          label={"Lastname"}
          id="lastname"
          value={lastName}
          onChange={() => {}}
          name="lastname"
        />
        <Input
          label={"Email"}
          id="email"
          value={email}
          onChange={() => {}}
          name="email"
        />
        <Input
          label={"Company"}
          id="company"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
          }}
          name="company"
        />
        <Input
          label={"Headline"}
          id="headline"
          value={headline}
          onChange={(e) => {
            setHeadline(e.target.value);
          }}
          name="headline"
        />
        <Input
          label={"Public Identifier"}
          readOnly
          id="publicIdentifier"
          value={publicIdentifier}
          onChange={() => {}}
          name="publicIdentifier"
        />
        <Input
          label={"Mobile"}
          id="mobile"
          value={mobile}
          onChange={() => {}}
          name="mobile"
        />
        <Input
          label={"Birth Date"}
          id="birthDate"
          value={birthDate}
          onChange={() => {}}
          name="birthDate"
        />
      </div>
      <Textarea
        label={"Summary"}
        id="summary"
        value={summary}
        onChange={(e) => {
          setSummary(e.target.value);
        }}
        name="summary"
      />
    </div>
  );
};

export default Informations;
