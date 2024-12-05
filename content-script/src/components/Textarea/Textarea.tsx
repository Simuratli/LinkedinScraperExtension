import React from "react";
import { InputPropTypes } from "../Input/Input.types";

const Textarea = ({
  id,
  label,
  onChange,
  value,
  name,
  readOnly,
}: InputPropTypes) => {
  return (
    <div className="unkai-floating-label-input unkai-floating-label-textarea">
      <textarea
        id={id}
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

export default Textarea;
