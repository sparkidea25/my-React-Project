import React from "react";

export const Form = ({ children, onSubmit, justifyContent }) => {
  return (


    <form noValidate onSubmit={(value) => {
      onSubmit(value)
    }}
      style={{ justifyContent: justifyContent }}
    >
      {children}
    </form>

  );
};

