import { Loader } from '../../components/Loader';
import { fetchRecipesByLetters } from '../../utils/fetchAllRecipes';
import styles from './CatalogPage.module.scss';
import { RecepyList } from '../../components/RecepyList/RecepyList';
import { useQuery } from 'react-query';

export const CatalogPage = () => {
  const { data, isLoading } = useQuery('recepies', fetchRecipesByLetters);

  return (
    <div>
      {isLoading ? (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      ) : (
        <RecepyList recepies={data} />
      )}
    </div>
  );
};
