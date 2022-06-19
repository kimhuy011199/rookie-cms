import React, { cloneElement } from 'react';
import style from './style.module.css';

interface FormGroupInterface {
  label?: string;
  boldLabel?: boolean;
  subLabel?: boolean;
  error?: string;
  type?: string;
  flexRow?: boolean;
}

type FormGroupType = React.HTMLProps<HTMLInputElement> & FormGroupInterface;

const FormGroup = (props: FormGroupType) => {
  const { label, boldLabel, subLabel, error, flexRow, children } = props;

  const renderLabel = label && (
    <label
      className={`${style.label} ${boldLabel && 'font-medium'} ${
        flexRow && 'pt-2'
      }`}
    >
      {label}
    </label>
  );
  const renderSubLabel = subLabel && (
    <span className={style.subLabel}>{subLabel}</span>
  );
  const renderError = error && (
    <span className={style.errorMessage}>{error}</span>
  );

  return (
    <div className={`${style.formGroup} ${flexRow && '!flex-row'}`}>
      {renderLabel}
      {renderSubLabel}
      <div className={`${flexRow && 'w-full'}`}>
        {cloneElement(children as React.ReactElement, { error })}
        {renderError}
      </div>
    </div>
  );
};

export default FormGroup;
