import React from 'react';
import style from './style.module.css';

interface InputInterface {
  error?: string;
  type?: string;
  defaultValue?: string;
}

type InputType = React.HTMLProps<HTMLInputElement> & InputInterface;

const Input = React.forwardRef<HTMLInputElement, InputType>(
  ({ type, error, defaultValue, ...rest }, ref) => {
    const inputProps = {
      ref,
      type,
      defaultValue,
      className: `${style.inputText} ${error && style.errorInput}`,
    };

    return <input {...inputProps} {...rest} />;
  }
);

export default Input;
