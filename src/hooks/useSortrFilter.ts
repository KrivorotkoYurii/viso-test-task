/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import { SingleValue } from 'react-select';
import { useSearchParams } from 'react-router-dom';
import { Option } from '../types/Options';

export const useSortFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'newest';

  const [selectedSortField, setSelectedSortField] = useState<Option>({
    label: sort,
    value: sort,
  });

  const handleSortFieldChange = (selected: SingleValue<Option>) => {
    if (selected) {
      setSelectedSortField(selected);

      const params = new URLSearchParams(searchParams);

      params.set('sort', selected.value.toLowerCase());
      params.delete('page');

      setSearchParams(params);
    }
  };

  return { selectedSortField, setSelectedSortField, handleSortFieldChange };
};
