export type FiltersType = {
    query: string | null,
    author: string | null,
    earliest_date: string | null,
    latest_date: string | null,
    sentiments: string[],
    categories: string[],
    publishers: string[]
}

// TODO(MC): Wait for Adeel to change to lowercase
export type ArticleType = {
    Id: string,
    Author: string,
    Cover_image: string,
    Sentiment: string,
    Category: string
    Date: string,
    Link: string,
    Publisher: string,
    Title: string,
    Body: string
}

// Used in the filters when using the multi select options from "react-select"
export interface MultiValueType {
    value: string;
    label: string;
}