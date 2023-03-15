import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { FiltersType, ArticleType } from "../utils/types";

const initialFilterState = {
    query: "",
    author: null,
    earliest_date: null,
    latest_date: null,
    sentiments: [],
    categories: [],
    publishers: [],
    expansion: false,
    ranking: "TFIDF",
    pagesize: "20",
    page: "1"
}

interface IArticlesContext {
    articles: any,
    filters: FiltersType,
    tempFilters: FiltersType,
    setArticles: Dispatch<SetStateAction<ArticleType[]>>;
    setFilters: Dispatch<SetStateAction<FiltersType>>;
    setTempFilters: Dispatch<SetStateAction<FiltersType>>;
    timeTaken: number | null,
    numResults: number,
    numArticlesStored: number | null,
    loadingArticles: boolean
}

const defaultState = {
    articles: [],
    filters: initialFilterState,
    tempFilters: initialFilterState,
    setArticles: () => {},
    setFilters: () => {},
    setTempFilters: () => {},
    timeTaken: null,
    numResults: 0,
    numArticlesStored: null,
    loadingArticles: false
}

export const ArticlesContext = createContext<IArticlesContext>(defaultState);

export const ArticlesProvider: React.FC<{children: React.ReactNode}> = props => {
    const [articles, setArticles] = useState<ArticleType[]>([]);
    const [filters, setFilters] = useState<FiltersType>(initialFilterState);
    const [tempFilters, setTempFilters] = useState<FiltersType>(initialFilterState);
    const [timeTaken, setTimeTaken] = useState(null);
    const [numResults, setNumResults] = useState(0);
    const [numArticlesStored, setNumArticlesStored] = useState(null);
    const [loadingArticles, setLoadingArticles] = useState(false);

    const fetchArticles = async () => {
        setLoadingArticles(true)

        // Avoid firing the function on page load: only fires when filters actually have changed
        if (filters != initialFilterState) {

            var tempAuthor = undefined

            if (filters.author !== null) {
                tempAuthor = filters.author
            } else {
                tempAuthor = []
            }

            const body = JSON.stringify({
                query: filters.query,
                datefrom: filters.earliest_date,
                dateto: filters.latest_date,
                categories: filters.categories,
                sentiments: filters.sentiments,
                publishers: filters.publishers,
                authors: tempAuthor,
                ranking: filters.ranking,
                expansion: filters.expansion, 
                pagesize: parseInt(filters.pagesize),
                page: parseInt(filters.page)
            })

            console.log(body, "😍")
            try {
                const response = await fetch('https://search-api-ziozucgzlq-ew.a.run.app/api/search', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: body
                });
            
                const data = await response.json();

                setTimeTaken(data.time_taken)
                setNumResults(data.num_results)
                setNumArticlesStored(data.num_articles_stored)

                var retrievedArticles: ArticleType[] = data.results;

                if (retrievedArticles === null) {
                    retrievedArticles = []
                }

                setArticles(retrievedArticles)

            } catch (error) {
                console.error(error);
            }
        } 
        
        setLoadingArticles(false)
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
            numResults,
            numArticlesStored,
            loadingArticles
          }}
        >
          {props.children}
        </ArticlesContext.Provider>
      );
}

export default ArticlesProvider;