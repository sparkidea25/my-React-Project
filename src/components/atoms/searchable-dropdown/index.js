import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";

export const SearchableDropdown = ({
    value,
    label,
    options = [{ label: 1, value: 1 }],
    widthStyle,
    onValueChange = () => { },
    isSearchable = true,
    placeholder
}) => {
    widthStyle = widthStyle ? widthStyle : "col-lg-5 col-md-6";
    const [dropValue, setValue] = useState(value)
    return (
        <div className={widthStyle}>
            {label && <label>{label}</label>}
            <div className="form-group">
                <ReactSelect
                    value={dropValue ? dropValue : value}
                    options={options}
                    isSearchable={isSearchable}
                    placeholder={placeholder}
                    onChange={value => {
                        onValueChange(value);
                        setValue(value)
                    }}
                />
            </div>
        </div>
    );
};
