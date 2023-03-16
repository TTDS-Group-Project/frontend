import React from 'react'

interface CheckboxProps {
    title: string;
    checked: boolean;
    isDisabled?: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    title,
    checked,
    isDisabled,
    handleChange,
    ...props
}) => {

    return (
        <label className={`flex items-center ${isDisabled && "cursor-not-allowed"}`}> 
            <input
                disabled={isDisabled}
                type="checkbox"
                className="form-checkbox h-4 w-4"
                checked={checked}
                onChange={handleChange}
            />
            <span className="ml-2 text-white text-sm">{title}</span>
        </label>

    )
}