import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { FiltersType, ArticleType } from "../utils/types";

const initialFilterState = {
    query: "",
    // query: null,
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
    tempFilters: FiltersType,
    setArticles: Dispatch<SetStateAction<ArticleType[]>>;
    setFilters: Dispatch<SetStateAction<FiltersType>>;
    setTempFilters: Dispatch<SetStateAction<FiltersType>>;
    timeTaken: number | null,
    numResults: number | null,

}

const defaultState = {
    articles: [],
    filters: initialFilterState,
    tempFilters: initialFilterState,
    setArticles: () => {},
    setFilters: () => {},
    setTempFilters: () => {},
    timeTaken: null,
    numResults: null
}

export const ArticlesContext = createContext<IArticlesContext>(defaultState);

export const ArticlesProvider: React.FC<{children: React.ReactNode}> = props => {
    const [articles, setArticles] = useState<ArticleType[]>([]);
    const [filters, setFilters] = useState<FiltersType>(initialFilterState);
    const [tempFilters, setTempFilters] = useState<FiltersType>(initialFilterState);
    const [timeTaken, setTimeTaken] = useState(null);
    const [numResults, setNumResults] = useState(null);

    const fetchArticles = async () => {
        console.log(filters, "🟢")
        try {
            const response = await fetch('https://search-api-ziozucgzlq-ew.a.run.app/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: filters.query,
                    author: [filters.author],
                    datefrom: filters.earliest_date,
                    dateto: filters.latest_date,
                    category: filters.category,
                    sentiment: filters.sentiment,
                    publishers: filters.publisher,
                    limit: 1000
                })
            });
        
            // TODO(MC): Also extract the num_results and time taken
            const data = await response.json();

            setTimeTaken(data.time_taken)
            setNumResults(data.num_results)

            const retrievedArticles: ArticleType[] = data.results;
            setArticles(retrievedArticles)

          } catch (error) {
            console.error(error);
          }
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
            setFilters,
            tempFilters,
            setTempFilters,
            timeTaken,
            numResults
          }}
        >
          {props.children}
        </ArticlesContext.Provider>
      );
}

export default ArticlesProvider;