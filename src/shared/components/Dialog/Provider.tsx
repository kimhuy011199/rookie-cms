import React, {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { ZINDEX_DEFAULT } from '../../constants/constants';
import style from './style.module.css';
import { IoMdClose } from 'react-icons/io';

interface DialogContextInterface {
  appendDialog: (props: any) => void;
  closeAllDialogs: () => void;
  closeCurrentDialog: (index: number) => void;
  openDialog: (props: any) => void;
}

const DialogContext = createContext({} as DialogContextInterface);

const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};

const DialogProvider = (props: any) => {
  const location = useLocation();
  const [dialogs, setDialogs] = useState<any>([]);

  const appendDialog = (dialog: any) => {
    setDialogs([...dialogs, dialog]);
  };

  const openDialog = (dialog: any) => {
    setDialogs([dialog]);
  };

  const closeAllDialogs = () => {
    setDialogs([]);
  };

  const closeCurrentDialog = (index: number) => {
    dialogs.splice(index, 1);
    setDialogs([...dialogs]);
  };

  const renderDialogView = (dialog: any, index: number) => {
    return cloneElement(dialog, {
      close: (data: any) => {
        if (
          dialog.props.afterClosed &&
          typeof dialog.props.afterClosed === 'function'
        ) {
          dialog.props?.afterClosed(data);
        }

        closeCurrentDialog(index);
      },
    });
  };

  useEffect(() => {
    closeAllDialogs();
  }, [location.pathname, location.search]);

  useEffect(() => {
    dialogs.length
      ? document.body.classList.add('prevent-scroll')
      : document.body.classList.remove('prevent-scroll');
  }, [dialogs]);

  return (
    <DialogContext.Provider
      value={{ appendDialog, closeAllDialogs, closeCurrentDialog, openDialog }}
    >
      {dialogs?.length > 0 && (
        <>
          {dialogs.map((dialog: any, index: number) => (
            <div key={`dialog-${index}`}>
              <>
                <div
                  className={style.dialogBackdrop}
                  style={{ zIndex: ZINDEX_DEFAULT + index + index }}
                />
                <div
                  className={style.dialogWrapper}
                  style={{
                    zIndex: ZINDEX_DEFAULT + index + index + 1,
                  }}
                  onClick={() => closeCurrentDialog(index)}
                >
                  {renderDialogView(dialog, index)}
                </div>
              </>
            </div>
          ))}
        </>
      )}
      {props.children}
    </DialogContext.Provider>
  );
};

const Dialog = (props: any) => {
  const { showCloseBtn = true, inlineStyle, close } = props;

  return (
    <div
      style={inlineStyle}
      className={style.dialogContainer}
      onClick={(e) => e.stopPropagation()}
    >
      {showCloseBtn && (
        <button className={style.close} onClick={close}>
          <IoMdClose />
        </button>
      )}
      {props.children}
    </div>
  );
};

export { DialogProvider, Dialog, useDialog };
