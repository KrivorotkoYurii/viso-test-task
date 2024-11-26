import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Recepy } from '../../types/recipy';
import { fetchRecipeById } from '../../utils/fetchById';
import { Loader } from '../../components/Loader';
import styles from './RecepyDetailPage.module.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs';

interface Ingredient {
  ingredient: string | null;
  measure: string | null;
}

export const RecepyDetailPage: React.FC = () => {
  const { idMeal } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecepy, setSelectedRecepy] = useState<Recepy | null>(null);

  const handleLoadProducts = () => {
    setIsLoading(true);

    fetchRecipeById(idMeal)
      .then(data => {
        setSelectedRecepy(data);
      })
      .catch(() => {
        throw new Error('error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  let ingredients: Ingredient[] = [];

  if (selectedRecepy) {
    ingredients = Array.from({ length: 20 }, (_, i) => ({
      ingredient: selectedRecepy[`strIngredient${i + 1}` as keyof Recepy],
      measure: selectedRecepy[`strMeasure${i + 1}` as keyof Recepy],
    })).filter(item => item.ingredient && item.ingredient.trim() !== '');
  }

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
        <div className={styles.detailPage}>
          {selectedRecepy && (
            <>
              <BreadCrumbs
                title="Catalog"
                theThirdPart={selectedRecepy.strMeal}
              />
              <h1 className={styles.title}>{selectedRecepy.strMeal}</h1>
              <img
                src={selectedRecepy.strMealThumb || ''}
                alt={selectedRecepy.strMeal || 'Recipe Image'}
                className={styles.image}
              />
              <div className={styles.metadata}>
                <p>
                  <strong>Category:</strong>{' '}
                  {selectedRecepy.strCategory || 'Unknown'}
                </p>
                <p>
                  <strong>Area:</strong> {selectedRecepy.strArea || 'Unknown'}
                </p>
                {selectedRecepy.strTags && (
                  <p>
                    <strong>Tags:</strong> {selectedRecepy.strTags}
                  </p>
                )}

                <div className={styles.greenAfter}></div>
              </div>
              <div className={styles.instructions}>
                <h2>Instructions</h2>
                <p>
                  {selectedRecepy.strInstructions ||
                    'No instructions available.'}
                </p>
                <div className={styles.greenAfter}></div>
              </div>
              <div className={styles.ingredients}>
                <h2>Ingredients</h2>
                <ul>
                  {ingredients.map((item, index) => (
                    <li key={index}>
                      {item.ingredient} - {item.measure}
                    </li>
                  ))}
                </ul>
                <div className={styles.greenAfter}></div>
              </div>
              {selectedRecepy.strYoutube && (
                <div className={styles.video}>
                  <h2>Video</h2>
                  <a
                    href={selectedRecepy.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch on YouTube
                  </a>
                </div>
              )}
              {selectedRecepy.strSource && (
                <div className={styles.source}>
                  <h2>Source</h2>
                  <a
                    href={selectedRecepy.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Original Recipe
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
