// General
import Head from 'next/head'
import Image from 'next/image';

// Components
import { ArticleCard, ActionButton, FormInput, SelectComponent } from "../components";

export default function Home() {

    return (
        <>
            <Head>
                <title>Search News Articles</title>
                <meta name="description" content="Generated by create next app" />
            </Head>
        
            <div className="bg-background min-h-screen rounded-lg p-7 pr-20">
                {/* Navbar */}
                <div className="w-[50%] grid grid-cols-4 gap-5">
                    {/* <div className="col-span-1">
                        <Image
                            src="/ttds-logo.svg"
                            width={35}
                            height={70}
                            alt="test" 
                        />
                    </div> */}

                    <div className="col-span-2">
                        <FormInput placeholder="Perform Search Query"/>
                    </div>

                    <div className="col-span-1">
                        <ActionButton>
                            Search
                        </ActionButton>
                    </div>
                </div>


                <div className="grid grid-cols-3 mt-20 gap-20">
                    <div>
                        <p className="text-2xl text-white mb-5">Filters</p>

                        <div className="bg-section-background rounded-xl py-7 px-6 grid grid-cols-1 gap-4 border-[1px] border-formInputBorder">
                            <FormInput title="Author" placeholder="Stephanie Miller" />
                            <FormInput title="Earliest Date" placeholder="DD/MM/AAAA" />
                            <FormInput title="Latest Date" placeholder="DD/MM/AAAA"/>

                            <SelectComponent
                                title="Sentiment"
                            />
                            <SelectComponent
                                title="Category"
                            />
                            <SelectComponent
                                title="Publisher"
                            />

                            <div className="flex justify-center">
                                <ActionButton>
                                    Apply filters
                                </ActionButton>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <div className="mb-5">
                            <p className="text-2xl text-white">Search Results</p>
                            <p className="test-sm text-grey">200 results (0.03 seconds)</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-10">
                            <ArticleCard />
                            <ArticleCard />
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}
