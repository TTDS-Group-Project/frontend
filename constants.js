export const REGEX_BOOLEAN_IDENTIFER = /^\[.*\]$/

export const SENTIMENT_OPTIONS = [
    { value: 'pos', label: 'Positive' },
    { value: 'neg', label: 'Negative' },
    { value: 'neu', label: 'Neutral' }
]

export const CATEGORY_OPTIONS = [
    { value: 'tech', label: 'Tech' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'business', label: 'Business' },
    { value: 'politics', label: 'Politics' },
    { value: 'sport', label: 'Sport' }
]

export const PUBLISHER_OPTIONS = [
    { value: 'bbc', label: 'BBC' },
    { value: 'financial_times', label: 'Financial Times' },
    { value: 'daily_mail', label: 'The Daily Mail' },
    { value: 'guardian', label: 'Guardian' }
]

export const RANKING_OPTIONS = [
    { value: 'TFIDF', label: 'TFIDF' },
    { value: 'BM25', label: 'BM25' }
]

const maximumPageSize = 100
export const PAGE_SIZE_OPTIONS =  [... Array.from({length: maximumPageSize})].map((each, index) => ({ value: (index + 1).toString(), label: (index+1).toString() }));