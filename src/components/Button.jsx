import React from 'react';

export default function Button({ children, onClick, type = 'button', className = '' }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`
                px-5 py-2 rounded-lg bg-linear-to-r from-blue-500 to-blue-600  text-white text-sm font-medium shadow-md hover:shadow-lg 
                transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                ${className}
      `}
        >
            {children}
        </button>
    );
}
