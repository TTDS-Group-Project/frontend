import React from 'react'

interface FormInputProps {
    title?: string;
    placeholder?: string;
    value: string | null;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput: React.FC<FormInputProps> = ({
    title,
    placeholder,
    value,
    handleChange,
    ...props
}) => {

    return (
        <div className="flex flex-col">
            <p className="text-sm text-grey">
                {title}
            </p>    

            <input 
                className="text-white text-sm px-4 py-3 rounded-xl bg-section-background border-solid border-[1px] border-formInputBorder"
                placeholder={placeholder}
                value={value ? value : ""}
                onChange={handleChange}
                />
        </div>  
    )
}