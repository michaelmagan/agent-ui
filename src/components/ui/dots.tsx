import React from "react";

interface DotsProps {
  className?: string;
}

export const Dots: React.FC<DotsProps> = ({ className = "" }) => {
  return (
    <div className={`flex space-x-2 justify-center items-center ${className}`}>
      <span className="sr-only">Loading...</span>
      <div className="h-1 w-1 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-1 w-1 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-1 w-1 bg-black rounded-full animate-bounce"></div>
    </div>
  );
};
