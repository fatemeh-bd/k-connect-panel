import React from "react";

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="font-bold text-gray-700 dark:text-gray-300 text-xl">
      {children}
    </h1>
  );
};

export default Title;
