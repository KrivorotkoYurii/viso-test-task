import { Loader } from '../../components/Loader';
import { fetchRecipesByLetters } from '../../utils/fetchAllRecipes';
import styles from './CatalogPage.module.scss';
import { RecepyList } from '../../components/RecepyList/RecepyList';
import { useQuery } from 'react-query';
import { Recepy } from '../../types/recipy';
import { useSearchParams } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { Pagination } from '../../components/Pagination';
import { useChoices } from '../../context/ChoicesContext';

export const CatalogPage = () => {
  const { data, isLoading } = useQuery('recepies', fetchRecipesByLetters);

  const [searchParams, setSearchParams] = useSearchParams();
  const [appliedQuery, setAppliedQuery] = useState('');

  const debounceDelay = 300;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const applyQuery = useCallback(debounce(setAppliedQuery, debounceDelay), [
    debounceDelay,
  ]);

  const query = searchParams.get('query') || '';

  const selectedCategory = searchParams.get('category') || '';

  const currentPage = searchParams.get('page') || '1';

  const handlePageChange = (pageWePress: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', pageWePress);

    if (pageWePress === '1') {
      params.delete('page');
    }

    setSearchParams(params);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    params.set('page', '1');
    applyQuery(event.target.value.trim());

    if (event.target.value === '') {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const params = new URLSearchParams(searchParams);

    params.set('category', event.target.value);
    params.set('page', '1');

    if (event.target.value === '') {
      params.delete('category');
    }

    setSearchParams(params);
  };

  const getFilteredRecepies = (allRecepies: Recepy[]) => {
    if (selectedCategory === '') {
      return allRecepies;
    }

    return allRecepies.filter(
      recepy => recepy.strCategory === selectedCategory,
    );
  };

  const getFilteredByCategoryAndQuery = (allR: Recepy[]) => {
    const prepearedRecepies = getFilteredRecepies(allR);

    return prepearedRecepies.filter(recepy =>
      recepy.strMeal?.toLowerCase()?.includes(appliedQuery.toLowerCase()),
    );
  };

  const getFilteredByPage = (allR: Recepy[]) => {
    const result = getFilteredByCategoryAndQuery(allR);

    const firstRecipeOnPage = (+currentPage - 1) * 14;

    const firstIndexOnPage = currentPage === '1' ? 0 : firstRecipeOnPage - 1;

    const lastRecipeOnPage = firstIndexOnPage + 14;

    return result.slice(firstIndexOnPage, lastRecipeOnPage);
  };

  const { addRecipe } = useChoices();

  const handleSelectRecipe = (recipe: Recepy) => {
    addRecipe(recipe);
  };

  if (isLoading) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className={styles.formElements}>
        <select
          onChange={handleCategoryChange}
          value={selectedCategory}
          className={styles.categorySelect}
        >
          <option value="">All Categories</option>
          {['Chicken', 'Vegetarian', 'Dessert', 'Beef', 'Pork'].map(
            category => (
              <option key={category} value={category}>
                {category}
              </option>
            ),
          )}
        </select>

        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              data-cy="NameFilter"
              type="search"
              className="input"
              placeholder="Search"
              value={query}
              onChange={handleQueryChange}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>
      </div>

      {data && (
        <>
          <RecepyList
            recepies={getFilteredByPage(data)}
            onSelectRecipe={handleSelectRecipe}
          />
          <Pagination
            onPageChange={handlePageChange}
            total={getFilteredByCategoryAndQuery(data)}
          />
        </>
      )}
    </div>
  );
};
