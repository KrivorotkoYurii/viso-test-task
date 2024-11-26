import React, { useState } from 'react';
import styles from './CardRecepy.module.scss';
import { Link } from 'react-router-dom';
import { useChoices } from '../../context/ChoicesContext'; // Підключення контексту

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
  const { addRecipe } = useChoices();
  const [isAdded, setIsAdded] = useState(false); // Стан для кнопки

  const handleAddRecipe = () => {
    if (!isAdded) {
      addRecipe({
        idMeal: id,
        strMeal: title,
        strMealThumb: image,
        strCategory: category,
        strArea: area,
        dateModified: null,
        strCreativeCommonsConfirmed: null,
        strDrinkAlternate: null,
        strImageSource: null,
        strIngredient1: null,
        strIngredient2: null,
        strIngredient3: null,
        strIngredient4: null,
        strIngredient5: null,
        strIngredient6: null,
        strIngredient7: null,
        strIngredient8: null,
        strIngredient9: null,
        strIngredient10: null,
        strIngredient11: null,
        strIngredient12: null,
        strIngredient13: null,
        strIngredient14: null,
        strIngredient15: null,
        strIngredient16: null,
        strIngredient17: null,
        strIngredient18: null,
        strIngredient19: null,
        strIngredient20: null,
        strInstructions: null,
        strMeasure1: null,
        strMeasure2: null,
        strMeasure3: null,
        strMeasure4: null,
        strMeasure5: null,
        strMeasure6: null,
        strMeasure7: null,
        strMeasure8: null,
        strMeasure9: null,
        strMeasure10: null,
        strMeasure11: null,
        strMeasure12: null,
        strMeasure13: null,
        strMeasure14: null,
        strMeasure15: null,
        strMeasure16: null,
        strMeasure17: null,
        strMeasure18: null,
        strMeasure19: null,
        strMeasure20: null,
        strSource: null,
        strTags: null,
        strYoutube: null,
      });
      setIsAdded(true);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__wrapper}>
        <Link to={`/catalog/${id}`}>
          {image && (
            <img src={image} alt="dish image" className={styles.image} />
          )}
          <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.text}>
              <strong>Category:</strong> {category}
            </p>
            <p className={styles.text}>
              <strong>Area:</strong> {area}
            </p>
          </div>
        </Link>
        <button
          className={`${styles.addButton} ${isAdded ? styles.added : ''}`}
          onClick={handleAddRecipe}
          disabled={isAdded} // Блокуємо повторне натискання
        >
          {isAdded ? 'Added' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
};
