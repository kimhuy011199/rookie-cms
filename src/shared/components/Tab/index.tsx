import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import style from './style.module.css';

const Tab = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [currentTab, setCurrentTab] = useState('');

  const tabList = [
    { text: 'Questions', link: '/questions' },
    { text: 'Answer', link: '/answers' },
    { text: 'Users', link: '/users' },
    { text: 'Tags', link: '/tags' },
  ];

  useEffect(() => {
    tabList.forEach((tab) => {
      if (pathname.includes(tab.link)) {
        setCurrentTab(tab.link);
      }
    });
  }, [pathname]);

  return (
    <div className={style.tabContainer}>
      <h3 className={style.heading}>{t('tab.heading')}</h3>
      <ul>
        {tabList.map((item) => (
          <li
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
