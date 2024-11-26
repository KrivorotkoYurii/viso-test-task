import React from 'react';
import { Recepy } from '../../types/recipy';
import { CardRecepy } from '../CardRecepy';
import styles from './RecepyList.module.scss';

interface Props {
  recepies: Recepy[];
}

export const RecepyList: React.FC<Props> = ({ recepies }) => {
  return (
    <div className={styles.listWrapper}>
      {recepies.map(recepy => (
        <CardRecepy
          key={recepy.idMeal}
          image={recepy.strMealThumb}
          title={recepy.strMeal}
          category={recepy.strCategory}
          area={recepy.strArea}
          id={recepy.idMeal}
        />
      ))}
    </div>
  );
};
