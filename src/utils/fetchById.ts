const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const fetchRecipeById = async (id: string = '1') => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data.meals[0];
  } catch (error) {
    throw error;
  }
};
