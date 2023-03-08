// General
import React from 'react'
import Image from 'next/image';


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
    const options = { day: "numeric", month: "long", year: "numeric" } as const;
    return date.toLocaleDateString("en-US", options);
  };


// Content included within the ArtileCardBase which contains all the information about the article
export const ArticleCard : React.FC<ArticleCardProps> = ({article})  => {

    return (
        <ArticleCardBase>
            <div className="md:flex md:flex-row">
                <div className="hidden md:block">
                    <Image
                    src={article.Cover_image}
                    alt="My Image"
                    width={225}
                    height={225}
                    className="rounded-md h-auto"
                    />
                </div>

                <div className="md:ml-5">
                    {/* Title*/}
                    <p className="text-white text-lg mb-3">
                        {article.Title}
                    </p>


                    {/* Headers*/}
                    <div className="grid grid-rows-2 gap-2">
                        <HeaderWithIcon
                            icon={<PersonIcon style={{color: "grey"}}/>}
                            title={`${article.Author} (${article.Publisher})`}
                        />

                        <HeaderWithIcon
                            icon={<AccessTimeIcon style={{color: "grey"}}/>}
                            title={formatDate(article.Date)}
                        />
                    </div>

                    {/* TODO(MC): Wait for Adeel to add the categories so I can show the real data here */}
                    <div className="flex flex-wrap mt-2">
                        <Tag value={article.Category}/>
                    </div>

                </div>

            </div>

            {/* Body */}
            <div className="mt-5">
                <p className="text-white text-sm">
                    {article.Body}
                </p>
            </div>



            
        </ArticleCardBase>
    )
}