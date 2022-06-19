import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.css';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <span className={styles.copyright}>{t('footer.copyright')}</span>
    </footer>
  );
};

export default Footer;
