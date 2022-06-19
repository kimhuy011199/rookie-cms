import React from 'react';
import { useTranslation } from 'react-i18next';
import style from './style.module.css';

interface UserInfoItemInterface {
  item?: any;
}

const UserInfoItem = (props: UserInfoItemInterface) => {
  const { item } = props;
  const { t } = useTranslation();

  if (!item) {
    return <></>;
  }

  return (
    <>
      <div className={style.info}>
        <span className={style.label}>{t(`settings.label.${item[0]}`)}</span>
        {item[0] === 'github' || item[0] === 'linkedin' ? (
          // eslint-disable-next-line jsx-a11y/anchor-has-content
          <a
            className={style.title}
            href={item[1]}
            target="_blank"
            rel="noreferrer"
          >
            {item[1]}
          </a>
        ) : (
          <span className={style.title}>{item[1]}</span>
        )}
      </div>
    </>
  );
};

export default UserInfoItem;
