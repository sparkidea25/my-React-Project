import React from "react";

export const Input = ({
  input,
  label,
  meta: { touched, error },
  config,
  placeholder,
  widthStyle,
  style,
  data,
  ...props
}) => {
  widthStyle = widthStyle ? widthStyle : "col-md-12";
  const validationSpan =
    touched && error ? (
      <span className="error_msg text-danger">{error}</span>
    ) : null;

  return (
    <div className={widthStyle}>
      <div className="form-group" style={style}>
        {label && <label>{label}</label>}
        <input className="form-control"
          placeholder={placeholder}
          {...input}
          {...config}
          // value={data}
          maxLength={60}
          autoComplete='off' />
        {validationSpan}
      </div>
    </div>
  );
};
