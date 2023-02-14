import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { FiltersType, ArticleType } from "../utils/types";

const initialFilterState = {
    query: null,
    author: null,
    earliest_date: null,
    latest_date: null,
    sentiment: [],
    category: [],
    publisher: []
}

interface IArticlesContext {
    articles: any,
    filters: FiltersType,
    setArticles: Dispatch<SetStateAction<ArticleType[]>>;
    setFilters: Dispatch<SetStateAction<FiltersType>>;
}

const defaultState = {
    articles: [],
    filters: initialFilterState,
    setArticles: () => {},
    setFilters: () => {},
}

export const ArticlesContext = createContext<IArticlesContext>(defaultState);

export const ArticlesProvider: React.FC<{children: React.ReactNode}> = props => {
    

    const [articles, setArticles] = useState<ArticleType[]>([]);
    const [filters, setFilters] = useState<FiltersType>(initialFilterState);

    // TODO(MC): Implement code to fetch articles once Backend API is ready
    const fetchArticles = async () => {
        console.log("fetching articles")
        return 0;
    //     const { data } = await axios.get(`/api/articles`, {
    //     params: filters
    //     });
    //     setArticles(data);
    };

    useEffect(() => {
        fetchArticles();
    }, [filters]);

    return (
        <ArticlesContext.Provider
          value={{
            articles,
            setArticles,
            filters,
            setFilters
          }}
        >
          {props.children}
        </ArticlesContext.Provider>
      );
}

export default ArticlesProvider;