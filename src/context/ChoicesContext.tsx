import { createContext, useContext, useState, ReactNode } from 'react';
import { Recepy } from '../types/recipy';

interface ChoicesContextProps {
  selectedRecipes: Recepy[];
  addRecipe: (recipe: Recepy) => void;
  removeRecipe: (idMeal: string) => void;
}

const ChoicesContext = createContext<ChoicesContextProps | undefined>(
  undefined,
);

export const ChoicesProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRecipes, setSelectedRecipes] = useState<Recepy[]>([]);

  const addRecipe = (recipe: Recepy) => {
    setSelectedRecipes(prev =>
      prev.some(r => r.idMeal === recipe.idMeal) ? prev : [...prev, recipe],
    );
  };

  const removeRecipe = (idMeal: string) => {
    setSelectedRecipes(prev => prev.filter(recipe => recipe.idMeal !== idMeal));
  };

  return (
    <ChoicesContext.Provider
      value={{ selectedRecipes, addRecipe, removeRecipe }}
    >
      {children}
    </ChoicesContext.Provider>
  );
};

export const useChoices = () => {
  const context = useContext(ChoicesContext);

  if (!context) {
    throw new Error('useChoices must be used within a ChoicesProvider');
  }

  return context;
};
