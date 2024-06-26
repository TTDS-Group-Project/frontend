// General
import React from 'react'

const handleArticleClick = (articleLink: string) => {
    window.open(articleLink, "_blank");
};

// Base for a article card, it's basically the dark card with padding, with another div behind it which has a background with the color of the gradient (this
// is a trick to make a gradient border color using tailwindCSS). 
export const ArticleCardBase : React.FC<{
    articleLink: string
    children: React.ReactNode
}> = props  =>
    <div onClick={() => handleArticleClick(props.articleLink)} className="rounded-lg bg-gradient-to-r from-gradient-left to-gradient-right p-[0.07rem] cursor-pointer">
        <div className="rounded-lg bg-section-background px-5 py-6">
            {props.children}
        </div>
    </div>

 