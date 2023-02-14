import React, { createContext, useState, useEffect } from 'react';

interface IArticlesContext {
    articles: any,
    filters: any,
    setArticles: React.Dispatch<React.SetStateAction<never[]>>,
    setFilters: React.Dispatch<React.SetStateAction<{}>>
}

export const ArticlesContext = createContext<IArticlesContext>({} as IArticlesContext);

export const ArticlesProvider: React.FC<{children: React.ReactNode}> = props => {
    const [articles, setArticles] = useState([]);
    const [filters, setFilters] = useState({});

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