import React from 'react'

interface TagProps {
    value: string;
}

export const Tag: React.FC<TagProps> = ({
    value,
    ...props
}) => {
    return (
        <div className="bg-tag-bg-color px-3 py-1 rounded-md mr-4 mt-2">
            <div className="text-tag-text-color text-sm">{value}</div>
        </div>
    )
}