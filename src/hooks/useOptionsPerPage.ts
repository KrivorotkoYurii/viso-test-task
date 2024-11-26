import { Option } from '../types/Options';

/* eslint-disable import/no-extraneous-dependencies */
export const useOptionsPerPage = (): Option[] => {
  return [
    {
      value: 'all',
      label: 'all',
    },
    {
      value: '4',
      label: '4',
    },

    {
      value: '8',
      label: '8',
    },

    {
      value: '16',
      label: '16',
    },
  ];
};
