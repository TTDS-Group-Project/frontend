// General
import React from 'react'

// Assets from Material-UI
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';

// Components
import { ArticleCardBase, HeaderWithIcon, Tag } from '..'

// Types
import {ArticleType} from "../../utils/types"

interface ArticleCardProps {
    article: ArticleType
}

// Convert date format from e.g. "2023-02-22" to "22 February 2023"
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    const day = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date);
    const year = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(date);
  
    return `${day} ${month} ${year}`;
};

// Content included within the ArtileCardBase which contains all the information about the article
export const ArticleCard : React.FC<ArticleCardProps> = ({article})  => {

    return (
        <ArticleCardBase>
            {/* Title*/}
            <p className="text-white text-lg mb-3">
                {article.title}
            </p>

            {/* Headers*/}
            <div className="grid grid-rows-2 gap-2">
                <HeaderWithIcon
                    icon={<PersonIcon style={{color: "grey"}}/>}
                    title={`${article.authors[0]} (${article.publisher})`}
                />

                <HeaderWithIcon
                    icon={<AccessTimeIcon style={{color: "grey"}}/>}
                    title={formatDate(article.date)}
                />
            </div>

            {/* TODO(MC): Wait for Adeel to add the categories so I can show the real data here */}
            <div className="flex flex-wrap mt-2">
                    <Tag value="Sports"/>
                    <Tag value="Romance"/>
                    <Tag value="Climate"/>
            </div>


            {/* Body */}
            <div className="mt-5">
                <p className="text-white text-sm">
                    {article.body}
                </p>
            </div>
        </ArticleCardBase>
    )
}