import axios from 'axios';

export interface Work {
  id: number;
  userName: string;
  userIntro: string;
  userSrc: string;
  userPhoto: string;
  title: string;
  content: string;
  imgSrc: string;
  itemLink: string;
  likes: number;
  views: number;
  time: string;
  categoryId: number | null;
  categoryName?: string;
}

export const getWorks = () => {
  return axios<Work[]>({
    method: 'GET',
    url: '/backend/works',
  });
};

export interface GetWorkByPagesProps {
  page: number;
  pageSize: number;
  searchText?: string;
  categoryId?: number;
}

export interface GetWorkByPagesRes {
  count: number;
  data: Work[];
}

export const GetWorkByPage = ({ page, pageSize, searchText, categoryId }: GetWorkByPagesProps) => {
  return axios<GetWorkByPagesRes>({
    method: 'GET',
    url: '/backend/works/pages',
    params: {
      page,
      pageSize,
      searchText,
      categoryId,
    },
  });
};

export const GetWorkById = (id: string) => {
  return axios<Work>({
    method: 'GET',
    url: `/backend/works/${id}?flag=client`,
  });
};

export const like = (id: number, action: 'like' | 'unlike') => {
  return axios<void>({
    method: 'PUT',
    url: `/backend/works/${id}/like`,
    data: { action },
  });
};
