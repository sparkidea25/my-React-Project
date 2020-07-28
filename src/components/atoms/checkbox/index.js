import React from "react";
import "./style.scss";

export const Checkbox = ({ multiple, index, lastFieldIndex, text, config, input, meta: { touched, error }, widthStyle, labelText, useDefaultProps = true }) => {
  const validationSpan =
    touched && error ? (
      <span className={`error_msg text-danger`} style={{ top: multiple && '53%' }}>{error}</span>
    ) : null;
  const style = widthStyle ? widthStyle : "col-sm-6"

  let defaultProps = useDefaultProps ? { ...input } : {}
  return (
    <div className={style}>
      <label className="form-checkbox">
        <input
          {...defaultProps}
          type="checkbox"
          className="form-check-input"
          {...config}
        />
        {text}
        <span className="checkmark"></span>
      </label>
      {(multiple && index !== lastFieldIndex) || (!multiple) ? null :
        validationSpan}
    </div>
  );
};

export default Checkbox;
