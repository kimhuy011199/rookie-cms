import React from 'react';
import { useTranslation } from 'react-i18next';
import MarkdownRender from '../Markdown';
import style from './style.module.css';

const SearchQuestionGuide = () => {
  const { t } = useTranslation();

  return (
    <div className={style.guide}>
      <h3 className={style.title}>{t('questions.search.title')}</h3>
      <div className={style.content}>
        <MarkdownRender content={t('questions.search.desc')} />
      </div>
    </div>
  );
};

export default SearchQuestionGuide;
