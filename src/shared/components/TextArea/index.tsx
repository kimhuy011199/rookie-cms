import React from 'react';
import style from './style.module.css';

interface TextAreaInterface {
  error?: string;
  canResized?: boolean;
  defaultValue?: string;
}

type TextAreaType = React.HTMLProps<HTMLTextAreaElement> & TextAreaInterface;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaType>(
  ({ error, defaultValue, canResized = true, ...rest }, ref) => {
    const inputProps = {
      ref,
      defaultValue,
      className: `${style.inputText} ${error && style.errorInput} ${
        !canResized && style.resize
      }`,
    };

    return <textarea {...inputProps} {...rest} />;
  }
);

export default TextArea;
