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
    <div className="row">
      <div className="col-md-12 text-center text-sm-right">
        <div className={classNames(["form-group", containerStyle])}>
          <button
            disabled={disabled}
            type={buttonType}
            onClick={(e) => { buttonAction() }}
            className={classNames([
              "btn btn-lg btn-primary",
              buttonStyle
            ])}>
            {buttonLabel}{" "}
            {buttonLabel === loginText && <i>
              {/* <img src={next} alt="" /> */}
            </i>}
          </button>
        </div>
      </div>
    </div >
  );
};
