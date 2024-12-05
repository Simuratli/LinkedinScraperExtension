import React from "react";
import "../../style/components/input.scss";
import { InputPropTypes } from "./Input.types";

const FloatingLabelInput = ({
  label,
  id,
  onChange,
  value,
  name,
  readOnly,
}: InputPropTypes) => {
  return (
    <div className="unkai-floating-label-input">
      <input
        id={id}
        type={"text"}
        name={name}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        className="unkai-floating-label-input__field"
        placeholder=" " // Keeps the space for the label float
      />
      <label htmlFor={id} className="unkai-floating-label-input__label">
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
