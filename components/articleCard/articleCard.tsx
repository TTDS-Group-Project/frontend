// General
import React, {useState} from 'react'
import Image from 'next/image';


// Assets from Material-UI
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';

// Components
import { ArticleCardBase, HeaderWithIcon, Tag } from '..'

// Constants
import {SENTIMENT_OPTIONS } from "../../constants"


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

const convertFirstLetterToUppercase = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

const getSentimentLabel = (sentiment: string) => {
    const sentimentOption = SENTIMENT_OPTIONS.find(option => option.value === sentiment);

    if (sentimentOption) {
        return sentimentOption.label; 
    } else {
        return ""
    }
}

const ImageWithFallback = (props: any) => {
    const { src, fallbackSrc, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            {...rest}
            src={imgSrc}
            onError={() => {
                setImgSrc(fallbackSrc);
            }}
        />
    );
};

// Content included within the ArtileCardBase which contains all the information about the article
export const ArticleCard : React.FC<ArticleCardProps> = ({article})  => {
    const handleImageError = (event: any) => {
        event.target.src = "https://ab-hwc.nhp.gov.in/download/document/recent.jpg"
      };

    return (
        <ArticleCardBase articleLink={article.Link}>
            <div className="md:flex md:flex-row">
                <div className="hidden md:block">
                    <ImageWithFallback
                    alt="My Image"
                    width={225}
                    height={225}
                    className="rounded-md h-auto"
                        src={article.Cover_image}
                        fallbackSrc={`https://www.suzukijember.com/gallery/gambar_product/default.jpg`}
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
                            title={`${article.Author} (${convertFirstLetterToUppercase(article.Publisher)})`}
                        />

                        <HeaderWithIcon
                            icon={<AccessTimeIcon style={{color: "grey"}}/>}
                            title={formatDate(article.Date)}
                        />
                    </div>

                    <div className="flex flex-wrap mt-2">
                        <Tag value={convertFirstLetterToUppercase(article.Category)}/>
                        <Tag value={convertFirstLetterToUppercase(getSentimentLabel(article.Sentiment))}/>
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