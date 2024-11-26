import { Recepy } from '../types/recipy';

export const fetchRecipesByLetters = async () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const allRecipes: Recepy[] = [];

  for (const letter of alphabet) {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,
    );
    const data = await response.json();

    if (data.meals) {
      allRecipes.push(...data.meals);
    }
  }

  return allRecipes.slice(0, 100);
};
