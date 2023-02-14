export type FiltersType = {
    query: string | null,
    author: string | null,
    earliest_date: string | null,
    latest_date: string | null,
    sentiment: string[],
    category: string[],
    publisher: string[]
}

// TODO(MC): Finish implementing 
export type ArticleType = {
    id: string | null,
    title: string
}