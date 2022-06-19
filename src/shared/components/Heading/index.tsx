import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.css';

interface HeadingProps {
  heading: string;
  addContentLink?: string;
  addContentText?: string;
}

const Heading = (props: HeadingProps) => {
  const { heading, addContentLink, addContentText } = props;

  return (
    <div className={style.headingContainer}>
      <h2 className={style.heading}>{heading}</h2>
      {addContentLink && (
        <Link className={style.link} to={addContentLink}>
          {addContentText}
        </Link>
      )}
    </div>
  );
};

export default Heading;
