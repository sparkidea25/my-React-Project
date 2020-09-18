import React,{useState, useEffect} from "react";
import ReactSelect from "react-select";

export const Select = ({
  defaultValue,
  label,
  config = {},
  meta: { touched, error },
  options,
  widthStyle,
  input,
  data,
  onValueChange = () => { },
  isSearchable = false,
  placeholder,
  value
}) => {
  widthStyle = widthStyle ? widthStyle : "";
  const validationSpan =
    touched && error ? (
      <span className="error_msg text-danger">{error}</span>
    ) : null;

const [selectValue,setSelectvalue] = useState('')

useEffect(() => {
 if(options){
  let obj  = options.filter(option => option.value === config.value)
  setSelectvalue(obj)
 }

},[config.value && options])

  return (
    <>
      {label && <label>{label}</label>}
      <div className="form-group">
        <ReactSelect
          {...input}
          {...config}
          options={options}
          // onChange={onValueChange}
          isSearchable={isSearchable}
          // placeholder={placeholder}
          value={selectValue}
          onChange={(value) => {
            console.log('changed selectedd vallue', value)
            input.onChange(value);
            onValueChange(value)
            setSelectvalue(value)
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
