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
  onValueChange = () => { },
  isSearchable = false,
  placeholder
}) => {
  widthStyle = widthStyle ? widthStyle : "";
  const validationSpan =
    touched && error ? (
      <span className="error_msg text-danger">{error}</span>
    ) : null;
  console.log(input, 'value')
  return (
    <>
      {label && <label>{label}</label>}
      <div className="form-group">
        <ReactSelect
          {...input}
          options={options}
          // onChange={onValueChange}
          isSearchable={isSearchable}
          placeholder={placeholder}
          value={value}
          onChange={(value) => {
            console.log(value)
            input.onChange(value);

            onValueChange(value)
          }}
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
    </>
  );
};
