import React from 'react';
import styles from './CardRecepy.module.scss';
import { Link } from 'react-router-dom';

interface Props {
  image: string | null;
  title: string | null;
  category: string | null;
  area: string | null;
  id: string | null;
}

export const CardRecepy: React.FC<Props> = ({
  image,
  title,
  category,
  area,
  id,
}) => {
  return (
    <Link to={`/catalog/${id}`}>
      <div className={styles.card}>
        {image && <img src={image} alt="dish image" className={styles.image} />}
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.text}>
            <strong>Category:</strong>
            {category}
          </p>
          <p className={styles.text}>
            <strong>Area:</strong>
            {area}
          </p>
        </div>
      </div>
    </Link>
  );
};
