import { Link } from 'react-router-dom';
import { useChoices } from '../../context/ChoicesContext';
import styles from './ChoicesPage.module.scss';

export const ChoicesPage = () => {
  const { selectedRecipes, removeRecipe } = useChoices();

  return (
    <div className={styles.choicesPage}>
      <h2 className={styles.title}>Selected Recipes</h2>

      {!!selectedRecipes.length ? (
        <ul className={styles.recipeList}>
          {selectedRecipes.map(recipe => (
            <li key={recipe.idMeal} className={styles.recipeItem}>
              <Link to={`/catalog/${recipe.idMeal}`}>
                <img
                  src={recipe.strMealThumb || 'https://via.placeholder.com/150'}
                  alt={recipe.strMeal || 'No description available'}
                  className={styles.recipeImage}
                />
              </Link>
              <div className={styles.recipeInfo}>
                <Link to={`/catalog/${recipe.idMeal}`}>
                  <h3>{recipe.strMeal || 'Unknown Recipe'}</h3>
                </Link>
                <p>
                  <strong>Category:</strong> {recipe.strCategory || 'N/A'}
                </p>
                <p>
                  <strong>Area:</strong> {recipe.strArea || 'N/A'}
                </p>
                <button
                  onClick={() => removeRecipe(recipe.idMeal!)}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nothing selected yet</p>
      )}
    </div>
  );
};
