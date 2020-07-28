import React from "react";

export const TimeInput = ({
    input,
    label,
    minuteInput = false,
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
                    type='number'
                    maxLength={2}
                    value={input.value ? input.value : minuteInput ? 1 : 0}
                    autoComplete='off' />
                {validationSpan}
            </div>
        </div>
    );
};
