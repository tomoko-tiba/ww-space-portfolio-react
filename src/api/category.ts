import axios from 'axios';

export interface Category {
  id: number;
  name: string;
}

export const getAllCategories = () => {
  return axios<Category[]>({
    method: 'GET',
    url: '/backend/categories',
  });
};
