import { useCallback, useState } from 'react';

export const useWidth = () => {
  const [width, setWidth] = useState(0);

  const updateWidth = useCallback(() => {
    setWidth(document.documentElement.clientWidth);
  }, []);

  return {
    width,
    updateWidth,
  };
};
