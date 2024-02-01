import axios from 'axios'

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
}

export const getWorks = () => {
    return axios<Work[]>({
        method: "GET",
        url: "http://localhost:3000/works",
    })
}

export interface GetWorkByPagesProps {
    page: number;
    pageSize: number;
}

export interface GetWorkByPagesRes {
    count: number;
    data: Work[];
}

export const GetWorkByPage = ({ page, pageSize }: GetWorkByPagesProps) => {
    return axios<GetWorkByPagesRes>({
        method: "GET",
        url: "http://localhost:3000/works/pages",
        params: {
            page,
            pageSize,
        },
    });
};

export const GetWorkById = (id: string) => {
    return axios<Work>({
        method: "GET",
        url: `http://localhost:3000/works/${id}`,
    });
}


