import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { FiltersType, ArticleType } from "../utils/types";

const initialFilterState = {
    query: "",
    // query: null,
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

        // Avoid firing the function on page load: only fires when filters actually have changed
        if (filters != initialFilterState) {

            var tempAuthor = undefined

            if (filters.author !== null) {
                tempAuthor = filters.author
            } else {
                tempAuthor = []
            }

            const errorBody = JSON.stringify({
                query: filters.query,
                authors: tempAuthor,
                datefrom: filters.earliest_date,
                dateto: filters.latest_date,
                sentiments: filters.sentiments,
                categories: filters.categories,
                publishers: filters.publishers,
                ranking: filters.ranking,
                expansion: filters.expansion, 
                pagesize: filters.pagesize,
                page: filters.page
            })

            console.log(errorBody, "🔵")
            console.log(filters.page)
            console.log(filters.pagesize)

            console.log(filters)

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
                
                // pagesize: 900,
                pagesize: parseInt(filters.pagesize),
                
                // page: 2
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

                console.log(data, "🟢")

                setTimeTaken(data.time_taken)
                setNumResults(data.num_results)

                const retrievedArticles: ArticleType[] = data.results;
                console.log(retrievedArticles, "🇫🇷")
                setArticles(retrievedArticles)

            } catch (error) {
                console.error(error);
            }
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