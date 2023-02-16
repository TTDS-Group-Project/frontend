import React, {useContext} from 'react';

import { ActionButton, FormInput, SelectComponent } from ".";
import { ArticlesContext } from "../contexts/ArticleContext";
import { FiltersType, MultiValueType } from "../utils/types";

// Used to display an icon on the left, and a text on the right (for example a clock icon on the left, with the date on the right)
export const FilterSection : React.FC<{}> = props  => {
    const { filters, setFilters } = useContext(ArticlesContext)
    const { tempFilters, setTempFilters } = useContext(ArticlesContext)

    const handleFormInputChange = (field: keyof FiltersType, value: string | null) => {
        setTempFilters((prevFilters: FiltersType) => ({
          ...prevFilters,
          [field]: value,
        }));
      };

    const handleSelectChange = (field: keyof FiltersType, selectedOption: MultiValueType[]) => {
        setTempFilters((prevFilters: FiltersType) => ({
            ...prevFilters,
            [field]: selectedOption.map((option: MultiValueType) => option.value),
          }));
    };

    const handleSubmit = () => {
        setFilters(tempFilters);
    }

    return (
        <div>
            <p className="text-2xl text-white mb-5">Filters</p>

            <div className="bg-section-background rounded-xl py-7 px-6 grid grid-cols-1 gap-4 border-[1px] border-formInputBorder">
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

                <SelectComponent title="Sentiment" handleChange={(selectedOption: MultiValueType[]) => handleSelectChange("sentiment", selectedOption)}/>
                <SelectComponent title="Category" handleChange={(selectedOption: MultiValueType[]) => handleSelectChange("category", selectedOption)} />
                <SelectComponent title="Publisher" handleChange={(selectedOption: MultiValueType[]) => handleSelectChange("publisher", selectedOption)} />

                <div className="flex justify-center">
                    <ActionButton onClick={() => handleSubmit()}>
                        Apply filters
                    </ActionButton>
                </div>
            </div>
        </div>
    )
}