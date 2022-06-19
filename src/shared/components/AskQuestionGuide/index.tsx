import React from 'react';
import { useTranslation } from 'react-i18next';
import { MARKDOWN_LINK } from '../../constants/constants';
import style from './style.module.css';

const AskQuestionGuide = () => {
  const { t } = useTranslation();
  const tips: [] = t('questions.guide.tips', { returnObjects: true });

  return (
    <div className={style.guide}>
      <h3 className={style.title}>{t('questions.guide.title')}</h3>
      <div className={style.content}>
        <p>{t('questions.guide.desc')}</p>
        <ul className={style.list}>
          {tips.map((item) => (
            <li className={style.item} key={item}>
              {item}
            </li>
          ))}
        </ul>
        <p>
          {t('questions.guide.markdown')}
          <a
            className={style.link}
            href={MARKDOWN_LINK}
            target="_blank"
            rel="noreferrer"
          >
            {t('questions.guide.link')}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AskQuestionGuide;
