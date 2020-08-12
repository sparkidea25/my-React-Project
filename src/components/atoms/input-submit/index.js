import React from "react";
import classNames from 'classnames';
// import next from "../../../assets/next.png";

export const InputSubmit = ({
  buttonLabel,
  buttonStyle,
  disabled = false,
  buttonType = 'submit',
  loginText = 'Log In',
  buttonAction = () => { },
  containerStyle
}) => {
  return (

    <button
      disabled={disabled}
      type={buttonType}
      onClick={(e) => { buttonAction() }}
      className={classNames([
        "btn btn-lg btn-primary btn-radius",
      ])}>
      {buttonLabel}{" "}
      {buttonLabel === loginText && <i>
        {/* <img src={next} alt="" /> */}
      </i>}
    </button>

  );
};
