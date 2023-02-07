import React from 'react'

interface FormInputProps {
    title?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
    title,
    ...props
}) => {
    return (
        <div className="grid">
            <p className="text-sm text-grey">
                {title}
            </p>    

            <input 
                className="text-white text-sm px-4 py-3 rounded-xl bg-section-background border-solid border-[1px] border-formInputBorder"
                placeholder="Perform search query"
                />
        </div>  
    )
}