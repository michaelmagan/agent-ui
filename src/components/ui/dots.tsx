import React from "react";

interface DotsProps {
  className?: string;
}

export const Dots: React.FC<DotsProps> = ({ className = "" }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <span className="sr-only">Loading...</span>
      <div className="h-1 w-1 bg-[#277DA1] rounded-full animate-bounce [animation-delay:-0.3s] mr-2"></div>
      <div className="h-1 w-1 bg-[#4D908E] rounded-full animate-bounce [animation-delay:-0.15s] mr-2"></div>
      <div className="h-1 w-1 bg-[#90BE6D] rounded-full animate-bounce"></div>
    </div>
  );
};
