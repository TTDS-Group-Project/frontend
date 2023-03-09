// General
import React from 'react';
import Select from 'react-select';

// Tailwind imports (to reference colors variables defined in the tailwind config file)
import tailwindConfig from '../tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig'

// Constants
import {SENTIMENT_OPTIONS, CATEGORY_OPTIONS, PUBLISHER_OPTIONS, RANKING_OPTIONS } from "../constants"

// Types
import { OptionType } from "../utils/types";

// Tailwind Config setup
const fullConfig = resolveConfig(tailwindConfig)
const tailwindColors: any = fullConfig.theme?.colors

// Styles to style the react-select component
const customStyles = {
    // Each individual option once the menu is opened
    option: (defaultStyles: any, state: any) => ({
        ...defaultStyles,
        color: state.isSelected ? "#212529" : "#fff",
        backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
        padding: "15px",
        margin: 0
    }),

    // The outer component
    control: (defaultStyles: any) => ({
        ...defaultStyles,
        backgroundColor: "transparent",
        padding: "4px",
        border: "1px solid #303241",
        borderRadius: "10px"
    }),

    // Each individual tag (which is shown once an option is selected)
    multiValue: (defaultStyles: any) => ({
        ...defaultStyles,
        backgroundColor: tailwindColors["tag-bg-color"],
        padding: "2px",
        borderRadius: "5px"
        }),

        // The value inside the tag
        multiValueLabel: (defaultStyles: any) => ({
    ...defaultStyles,
        color: "tag-text-color",
        padding: "2px"
    }),

    // The menu showing all options once user clicks on "Select"
    menu: (defaultStyles: any) => ({
        ...defaultStyles,
        backgroundColor: tailwindColors["background"],
        padding: 0,
        margin: 0
        }),

    singleValue: (defaultStyles: any) => ({ ...defaultStyles, color: "#fff"}),
};

const getOptions = (title: string) => {
    switch (title) {
        case "Sentiment":
            return SENTIMENT_OPTIONS;
        case "Category":
            return CATEGORY_OPTIONS;
        case "Publisher":
            return PUBLISHER_OPTIONS;
        case "Ranking": 
            return RANKING_OPTIONS;
    }
}


interface SelectProps {
    title: string;
    handleChange: any;
    defaultValue?: OptionType;
    isMulti: boolean;
}


export const SelectComponent: React.FC<SelectProps> = ({
    title,
    handleChange,
    defaultValue,
    isMulti,
    ...props
}) => {

    return (
        <div className="text-sm">
            <p className="text-grey">
                {title}
            </p> 

            <div className="text-tag-text-color">
                <Select 
                    isMulti={isMulti}
                    onChange={handleChange}
                    options={getOptions(title)} 
                    styles={customStyles} 
                    placeholder="Any"
                    defaultValue={defaultValue}
                />
            </div>
        </div>
    )
}
