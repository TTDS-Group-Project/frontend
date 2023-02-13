import React, { CSSProperties } from 'react';

import Select from 'react-select';

import tailwindConfig from '../tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig'

const fullConfig = resolveConfig(tailwindConfig)
const tailwindColors: any = fullConfig.theme?.colors

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const customStyles = {
    option: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      color: state.isSelected ? "#212529" : "#fff",
      backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
      padding: "15px",
      margin: 0
    }),

    control: (defaultStyles: any) => ({
      ...defaultStyles,
      backgroundColor: "transparent",
      padding: "4px",
      border: "1px solid #303241",
      borderRadius: "10px"
    }),

    multiValue: (defaultStyles: any) => ({
        ...defaultStyles,
        backgroundColor: tailwindColors["tag-bg-color"],
        padding: "2px",
        borderRadius: "5px"
      }),

      multiValueLabel: (defaultStyles: any) => ({
    ...defaultStyles,
        color: "tag-text-color",
        padding: "2px"
    }),

      
    menu: (defaultStyles: any) => ({
        ...defaultStyles,
        backgroundColor: tailwindColors["background"],
        padding: 0,
        margin: 0
      }),

    singleValue: (defaultStyles: any) => ({ ...defaultStyles, color: "red", fontColor: "red" }),
  };

  export const SelectComponent: React.FC<{}> = () => {
    return (
      <div className="text-tag-text-color text-sm">
        <Select isMulti options={options} styles={customStyles} />
        </div>
    )
}
