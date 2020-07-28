import React from "react";

export const TextArea = ({
    value,
    input,
    label,
    meta: { touched, error },
    config,
    placeholder,
    widthStyle
}) => {


    widthStyle = widthStyle ? widthStyle : "col-md-12";
    const validationSpan =
        touched && error ? (
            <span className="error_msg text-danger">{error}</span>
        ) : null;
    return (
        <div className={widthStyle}>
            <div className="form-group">
                {label && <label>{label}</label>}
                <textarea className="form-control" {...input} style={{ color: 'black' }} placeholder={placeholder} {...config} />
                {validationSpan}
            </div>
        </div>
    );
};
