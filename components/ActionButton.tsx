// General
import React, { ButtonHTMLAttributes } from 'react';

// Props for button
export interface ActionButtonProps extends ButtonHTMLAttributes<any> {
    variant?: string;
    className?: string;
    children: React.ReactNode;
}

// Button calling for action (such as "Search" button)
export const ActionButton : React.FC<ActionButtonProps> = ({
    variant,
    className,
    children, 
    ...props}) => (
    <button 
        className={`cursor-pointer px-12 py-3 bg-gradient-to-r from-gradient-left to-gradient-right rounded-xl ${className ?? ''}`}
        {...props}
    >
        <p className={`font-bold text-white`}>
            {children}
        </p>
    </button>
)
