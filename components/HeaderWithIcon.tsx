import React from 'react';

interface HeaderWithIconProps {
    icon: React.ReactNode;
    title: string | undefined;
}

// Used to display an icon on the left, and a text on the right (for example a clock icon on the left, with the date on the right)
export const HeaderWithIcon : React.FC<HeaderWithIconProps> = props  =>
    <div className="flex">
        <div>
            {props.icon}
        </div>

        <span className="text-grey ml-2 flex items-end">
            {props.title}
        </span>
    </div>