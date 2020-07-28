import React from "react";
import ReactSelect from "react-select";

export const Select = ({
  value,
  label,
  config,
  meta: { touched, error },
  options,
  widthStyle,
  input,
  data,
  onChange,
  onValueChange = () => { },
  isSearchable = false,
  placeholde
}) => {
  widthStyle = widthStyle ? widthStyle : "col-md-12";
  const validationSpan =
    touched && error ? (
      <span className="error_msg text-danger">{error}</span>
    ) : null;

  return (
    <div className={widthStyle}>
      {label && <label>{label}</label>}
      <div className="form-group">
        <ReactSelect
          {...input}
          options={options}
          isSearchable={isSearchable}
          placeholder={placeholde}
          // value={input.value}
          // onChange={value => {
          //   input.onChange(value);
          //   onValueChange(value)
          // }}
          onBlur={event => event.preventDefault()}
        // onBlur={value => input.onBlur(value)}
        // onInputChange={() => {
        //   input.onChange(input.value);
        // }}
        // onBlur={() => {
        //   input.onBlur(input.value);
        // }}
        />
        {validationSpan}
      </div>

      {/* <select className="form-control" {...input} {...config}>
        {options.map(option => (
          <option value={option}>{option}</option>
        ))}
      </select> */}
    </div>
  );
};
