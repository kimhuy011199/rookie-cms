import {
  createContext,
  createElement,
  FunctionComponent,
  useContext,
  useState,
} from 'react';
import style from './style.module.css';

interface MenuContextInterface {
  open: boolean;
  setOpen: any;
}

const MenuContext = createContext({} as MenuContextInterface);

const Menu: any = (props: any) => {
  const [open, setOpen] = useState(false);

  return (
    <MenuContext.Provider value={{ open, setOpen }}>
      <div className={style.menu}>
        {props.children}
        {open && (
          <div className={style.menuBackdrop} onClick={() => setOpen(!open)} />
        )}
      </div>
    </MenuContext.Provider>
  );
};

const MenuButton: FunctionComponent = (props) => {
  const { open, setOpen } = useContext(MenuContext);

  return (
    <button type="button" onClick={() => setOpen(!open)}>
      {props.children}
    </button>
  );
};

const MenuList: FunctionComponent = (props) => {
  const { open } = useContext(MenuContext);

  return (
    <>{open ? <ul className={style.menuList}>{props.children}</ul> : null}</>
  );
};

const MenuItem: FunctionComponent<any> = (props: any) => {
  const {
    children,
    as = 'li',
    onClick,
    className,
    value,
    ...otherProps
  } = props;
  const { open, setOpen } = useContext(MenuContext);

  const handleChangeItem = () => {
    setOpen(!open);
    if (onClick && typeof onClick === 'function') {
      onClick(value);
    }
  };

  return createElement(
    as,
    {
      className: style.menuItem,
      onClick: handleChangeItem,
      ...otherProps,
    },
    <>{children}</>
  );
};

Menu.Button = MenuButton;
Menu.List = MenuList;
Menu.Item = MenuItem;

export { Menu, MenuButton, MenuList, MenuItem };
