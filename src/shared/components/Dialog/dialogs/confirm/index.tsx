import React from 'react';
import Button from '../../../Button';
import { Dialog } from '../../Provider';
import style from './style.module.css';

interface ConfirmDialogOptions {
  title: string;
  content: string;
  submitBtnText: string;
  cancelBtnText?: string;
  onClick?: (event?: any) => void;
  close?: () => void;
}

const ConfirmDialog = (props: ConfirmDialogOptions) => {
  const {
    title,
    content,
    submitBtnText,
    onClick,
    close,
    cancelBtnText,
    ...otherProps
  } = props;

  const handleSubmit = (event: any) => {
    if (onClick && typeof onClick === 'function') {
      close && close();
      onClick(event);
    }
  };

  return (
    <Dialog {...otherProps}>
      <Dialog.Header heading={title} close={close} />
      <Dialog.Body>
        <p className={style.content}>{content}</p>
      </Dialog.Body>
      <Dialog.Footer>
        <div className={style.actions}>
          <Button
            label={cancelBtnText}
            type="button"
            variant="blank"
            handleFuncion={close}
          />
          <Button
            label={submitBtnText}
            variant="primary"
            handleFuncion={handleSubmit}
          />
        </div>
      </Dialog.Footer>
    </Dialog>
  );
};

export default ConfirmDialog;
