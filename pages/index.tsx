// General
import React, {useContext} from 'react';
import Head from 'next/head'
import ReactPaginate from "react-paginate"

// Contexts
import { ArticlesContext } from "../contexts/ArticleContext";

// Components
import { ArticleCard, FilterSection, Spinner } from "../components";

// Types
import {ArticleType} from "../utils/types"


export default function Home() {
    const { articles, timeTaken, numResults, numArticlesStored, loadingArticles } = useContext(ArticlesContext)

    return (
        <>
            <Head>
                <title>Search News Articles</title>
                <meta name="description" content="Generated by create next app" />
            </Head>
        
            <div className="bg-background min-h-screen rounded-lg p-7 md:pr-20">
                <div className="md:grid md:grid-cols-3 mt-10 md:mt-5 gap-20 md:relative md:h-screen">
                    <div className="sticky top-0 col-span-1 z-10">
                        <FilterSection />
                    </div>

                    <div className="col-span-2 mt-10 md:mt-0 md:col-start-2 md:overflow-auto">
                        <div className="mb-5">
                            <p className="text-2xl text-white">Search Results</p>
                            {/* Only show the time taken and number of results if a query has been actually made */}
                            {((timeTaken !== null) && (numResults !== null)) && 
                            <p className="test-sm text-grey">{numResults} results retrieved in {timeTaken} seconds, from a total of {numArticlesStored} stored documents.</p>
                            }
                        </div>

                        {/* If it's loading articles, show the spinner, otherwise show the retrieved articles */}
                        {
                            loadingArticles 
                            ? 
                            (
                                <div className="h-screen">
                                    <div className="flex justify-center h-screen items-center">
                                        <Spinner />
                                    </div>

                                </div>
                            )
                            : 
                            <div className="grid md:grid-cols-1 gap-10">
                                {articles.length > 0 && (
                                    articles.map((article: ArticleType) => (
                                        <div key={article.Id} className="col-span-1">
                                        <ArticleCard article={article} />
                                        </div>
                                    ))
                                )}

                                <div className="">
                                {/* <div className="h-screen"> */}
                                    {articles.length == 0 && (
                                        <div className="text-lg text-grey flex justify-center h-screen items-center pb-[30px]">Please perform a search query or update your search parameters in order to view results!</div>
                                    )}
                                </div>
                            </div>
                        }
                    </div>
                <div className="col-start-2 col-span-1">
                    <div className="flex justify-center mt-2">
                        <ReactPaginate
                            previousLabel={"← Previous"}
                            nextLabel={"Next →"}
                            pageCount={100}
                            onPageChange={() => console.log("hello")}
                            containerClassName={"py-5 px-4 rounded-md bg-section-background text-white flex justify-between w-[100%]"}
                            previousLinkClassName={"font-bold"}
                            nextLinkClassName={"font-bold"}
                            disabledClassName={""}
                            activeClassName={"text-gradient-left"}
                        />
                    </div>
                </div>
                </div>

            </div>
    </>
  )
}
