import React, {useContext} from 'react';

import { ActionButton, FormInput, SelectComponent } from ".";
import { ArticlesContext } from "../contexts/ArticleContext";

// Used to display an icon on the left, and a text on the right (for example a clock icon on the left, with the date on the right)
export const FilterSection : React.FC<{}> = props  => {
    const { filters, setFilters } = useContext(ArticlesContext)

    return (
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
    )
}