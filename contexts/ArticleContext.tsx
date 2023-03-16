// General
import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';

// Types
import { FiltersType, ArticleType } from "../utils/types";

// Constants
import {REGEX_BOOLEAN_IDENTIFER, REGEX_PHRASE_IDENTIFER} from "../constants"

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
    page: "1",
    ignorecache: false
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
    loadingArticles: boolean,
    spellCheckedQuery: string,
    setSpellCheckedQuery: Dispatch<SetStateAction<string>>;
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
    loadingArticles: false,
    spellCheckedQuery: "",
    setSpellCheckedQuery: () => {}
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
    const [spellCheckedQuery, setSpellCheckedQuery] = useState("");

    const spellCheck = async (query: string) => {
        const body = JSON.stringify({
            message: query,
        })
        
        try {
            var checkedMessage = ""

            const response = await fetch('https://query-suggestion-ziozucgzlq-ew.a.run.app/query-suggestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body
            })
            .then(response => response.json())
            .then(data => {
                checkedMessage = data.message;
            })

            // Doesn't show the spell check suggestion if it's the same as query (as there are no errors)
            if (checkedMessage !== query) {
                setSpellCheckedQuery(checkedMessage)
            }

        } catch (error) {
            console.error(error);
        }
    }

    const fetchArticles = async () => {
        setLoadingArticles(true)
        setSpellCheckedQuery("")

        // Avoid firing the function on page load: only fires when filters actually have changed
        if (filters != initialFilterState) {

            // TODO(MC): Only do spell check if it's freetext search

            const query = filters.query

            // Only performs spell check if it's freetext search (not phrase nor boolean/proximity)
            if (!REGEX_BOOLEAN_IDENTIFER.test(query) && (!REGEX_PHRASE_IDENTIFER.test(query))) {
                spellCheck(filters.query)
            }

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
                page: parseInt(filters.page),
                ignorecache: filters.ignorecache
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
            loadingArticles,
            spellCheckedQuery,
            setSpellCheckedQuery
          }}
        >
          {props.children}
        </ArticlesContext.Provider>
      );
}

export default ArticlesProvider;