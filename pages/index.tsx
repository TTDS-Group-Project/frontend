// General
import React, {useContext} from 'react';
import Head from 'next/head'

// Contexts
import { ArticlesContext } from "../contexts/ArticleContext";

// Components
import { ArticleCard, FilterSection, NavbarSection } from "../components";

// Types
import {ArticleType} from "../utils/types"

export default function Home() {
    const { articles, timeTaken, numResults } = useContext(ArticlesContext)

    return (
        <>
            <Head>
                <title>Search News Articles</title>
                <meta name="description" content="Generated by create next app" />
            </Head>
        
            <div className="bg-background min-h-screen rounded-lg p-7 md:pr-20">
                <div className="md:w-[50%] grid gap-3 md:grid-cols-4 md:gap-5 ">
                    <NavbarSection />
                </div>


                <div className="md:grid md:grid-cols-3 mt-10 md:mt-20 gap-20 md:relative md:h-screen">
                    <div className="sticky top-0 col-span-1 z-10">
                        <FilterSection />
                    </div>

                    <div className="col-span-2 mt-10 md:mt-0 md:col-start-2 md:overflow-auto">
                        <div className="mb-5">
                            <p className="text-2xl text-white">Search Results</p>
                            {/* Only show the time taken and number of results if a query has been actually made */}
                            {((timeTaken !== null) && (numResults !== null)) && 
                            <p className="test-sm text-grey">{numResults} results ({timeTaken} seconds)</p>
                            }
                        </div>
                        
                        <div className="grid md:grid-cols-1 gap-10">
                        {/* <div className="grid md:grid-cols-2 gap-10"> */}
                        {articles.map((article: ArticleType) => (
                            <div key={article.Id} className="col-span-1">
                                <ArticleCard article={article} />
                            </div>
                        ))}
                        </div>

                        
                        
                    </div>
                </div>
            </div>
    </>
  )
}
