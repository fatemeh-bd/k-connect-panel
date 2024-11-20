import React from "react";

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="font-bold mb-4 text-secondary-600 text-xl">
      {children}
    </h1>
  );
};

export default Title;
