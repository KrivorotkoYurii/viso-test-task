import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { fetchRecipesByLetters } from '../../utils/fetchAllRecipes';
import styles from './CatalogPage.module.scss';
import { Recepy } from '../../types/recipy';
import { RecepyList } from '../../components/RecepyList/RecepyList';

export const CatalogPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recepies, setRecepies] = useState<Recepy[]>([]);

  const handleLoadProducts = () => {
    setIsLoading(true);

    fetchRecipesByLetters()
      .then(data => {
        setRecepies(data);
      })
      .catch(() => {
        throw new Error('a');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleLoadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      ) : (
        <RecepyList recepies={recepies} />
      )}
    </div>
  );
};
