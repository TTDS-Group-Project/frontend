import React, {useContext, useState} from 'react';

import { ActionButton, FormInput, SelectComponent } from ".";
import { ArticlesContext } from "../contexts/ArticleContext";
import { FiltersType } from "../utils/types";

// Used to display an icon on the left, and a text on the right (for example a clock icon on the left, with the date on the right)
export const NavbarSection : React.FC<{}> = props  => {
    const { filters, setFilters } = useContext(ArticlesContext)
    const { tempFilters, setTempFilters } = useContext(ArticlesContext)

    const handleFormInputChange = (field: keyof FiltersType, value: string | null) => {
        setTempFilters((prevFilters: FiltersType) => ({
          ...prevFilters,
          [field]: value,
        }));
      };

    const handleSubmit = () => {
        setFilters(tempFilters);
    }

    return (
        <>
        {/* <div className="col-span-1">
                        <Image
                            src="/ttds-logo.svg"
                            width={35}
                            height={70}
                            alt="test" 
                        />
                    </div> */}

            <div className="md:col-span-2">
                <FormInput 
                    handleChange={(e) => handleFormInputChange("query", e.target.value)} 
                    value={tempFilters.query} 
                    placeholder="Perform Search Query" 
                />
            </div>

            <div className="md:col-span-1">
                <ActionButton onClick={handleSubmit}>
                    Search
                </ActionButton>
            </div>
        </>    
    )
}