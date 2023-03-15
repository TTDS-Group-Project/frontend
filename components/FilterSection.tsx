import React, {useContext, useState} from 'react';

import { ActionButton, FormInput, SelectComponent, Checkbox, ArticleCardBase } from ".";
import { ArticlesContext } from "../contexts/ArticleContext";
import { FiltersType, OptionType } from "../utils/types";
import {RANKING_OPTIONS, PAGE_SIZE_OPTIONS, REGEX_BOOLEAN_IDENTIFER } from "../constants"


// Used to display an icon on the left, and a text on the right (for example a clock icon on the left, with the date on the right)
export const FilterSection : React.FC<{}> = props  => {
    const { filters, setFilters } = useContext(ArticlesContext)
    const { tempFilters, setTempFilters } = useContext(ArticlesContext)

    const [isBoolean, setIsBoolean] = useState(false)

    const handleFormInputChange = (field: keyof FiltersType, value: string | null) => {
        if (field == "query" && value) {

            if (REGEX_BOOLEAN_IDENTIFER.test(value)) { 
                setIsBoolean(true)
            } else {
                setIsBoolean(false)
            }
        }

        setTempFilters((prevFilters: FiltersType) => ({
          ...prevFilters,
          [field]: value,
        }));
      };

    const handleMultiSelectChange = (field: keyof FiltersType, selectedOption: OptionType[]) => {
        setTempFilters((prevFilters: FiltersType) => ({
            ...prevFilters,
            [field]: selectedOption.map((option: OptionType) => option.value),
          }));
    };

    const handleSelectChange = (field: keyof FiltersType, selectedOption: OptionType) => {
        setTempFilters((prevFilters: FiltersType) => ({
            ...prevFilters,
            [field]: selectedOption.value,
          }));
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTempFilters((prevFilters: FiltersType) => ({
            ...prevFilters,
            expansion: event.target.checked
          }));
      };

    const handleSubmit = () => {
        setFilters(tempFilters);
    }

    return (
        <div>
            <p className="text-2xl text-white mb-5">Search parameters</p>

            <div className="rounded-lg bg-gradient-to-r from-gradient-left to-gradient-right p-[0.07rem] cursor-pointer">
                <div className="rounded-lg bg-section-background">
                    <div className="bg-section-background  rounded-xl py-7 px-6 grid grid-cols-1 gap-4 border-[1px] border-formInputBorder">
                        <FormInput 
                            handleChange={(e) => handleFormInputChange("query", e.target.value)} 
                            value={tempFilters.query} 
                            placeholder="Perform Search Query" 
                            title="Search query"
                        />

                        <FormInput 
                            handleChange={(e) => handleFormInputChange("author", e.target.value)} 
                            value={tempFilters.author} 
                            title="Author" 
                            placeholder="Stephanie Miller" 
                        />

                        <FormInput 
                            handleChange={(e) => handleFormInputChange("earliest_date", e.target.value)} 
                            value={tempFilters.earliest_date} 
                            title="Earliest Date" 
                            placeholder="DD/MM/AAAA"
                        />

                        <FormInput 
                            handleChange={(e) => handleFormInputChange("latest_date", e.target.value)} 
                            value={tempFilters.latest_date} 
                            title="Latest Date" 
                            placeholder="DD/MM/AAAA"
                        />

                        <SelectComponent title="Sentiment" handleChange={(selectedOption: OptionType[]) => handleMultiSelectChange("sentiments", selectedOption)} isMulti={true} />
                        <SelectComponent title="Category" handleChange={(selectedOption: OptionType[]) => handleMultiSelectChange("categories", selectedOption)} isMulti={true} />
                        <SelectComponent title="Publisher" handleChange={(selectedOption: OptionType[]) => handleMultiSelectChange("publishers", selectedOption)} isMulti={true} />

                        <SelectComponent isDisabled={isBoolean} title="Ranking" handleChange={(selectedOption: OptionType) => handleSelectChange("ranking", selectedOption)} defaultValue={RANKING_OPTIONS[0]} isMulti={false} />

                        <SelectComponent title="Results per page" handleChange={(selectedOption: OptionType) => handleSelectChange("pagesize", selectedOption)} defaultValue={PAGE_SIZE_OPTIONS[19]} isMulti={false} />

                        <Checkbox isDisabled={isBoolean} title="Query Expansion" checked={tempFilters.expansion} handleChange={handleCheckboxChange}/>

                        <div className="flex justify-center mt-2">
                            <ActionButton onClick={() => handleSubmit()}>
                                Search
                            </ActionButton>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}