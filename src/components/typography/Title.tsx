import React from "react";

const Title = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <h1 className={`font-bold mb-4 text-secondary-600 text-xl ${className || ""}`}>
      {children}
    </h1>
  );
};

export default Title;
