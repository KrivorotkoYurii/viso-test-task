import React, { useState } from 'react';
import styles from './Pagination.module.scss';
import { Recepy } from '../../types/recipy';

interface Props {
  onPageChange: (pageWePress: string) => void;
  total: Recepy[];
}

export const Pagination: React.FC<Props> = ({ onPageChange, total }) => {
  const [selectedButton, setSelectedButton] = useState('1');
  const buttons = [];

  const totalReceipeToShow = total.length;

  const lastPage = Math.ceil(totalReceipeToShow / 14);

  for (let i = 1; i <= lastPage; i++) {
    buttons.push(`${i}`);
  }

  const pageChangeAndSelectButton = (butt: string) => {
    onPageChange(butt);
    setSelectedButton(butt);
  };

  return (
    <div className={styles.pagination}>
      {buttons.map(button => (
        <button
          key={button}
          onClick={() => pageChangeAndSelectButton(button)}
          className={
            selectedButton === button
              ? styles.selected
              : styles.pagination__item
          }
        >
          {button}
        </button>
      ))}
    </div>
  );
};
