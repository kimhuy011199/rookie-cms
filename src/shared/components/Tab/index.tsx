import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { TAB_LIST } from '../../constants/constants';
import style from './style.module.css';

const Tab = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [currentTab, setCurrentTab] = useState('');

  useEffect(() => {
    TAB_LIST.forEach((tab) => {
      if (pathname.includes(tab.link)) {
        setCurrentTab(tab.link);
      }
    });
  }, [pathname]);

  return (
    <div className={style.tabContainer}>
      <h3 className={style.heading}>{t('tab.heading')}</h3>
      <ul>
        {TAB_LIST.map((item) => (
          <li
            key={item.link}
            className={`${style.item} ${
              currentTab === item.link && style.active
            }`}
          >
            <Link className={style.link} to={item.link}>
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tab;
