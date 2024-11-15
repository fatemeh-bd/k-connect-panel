import React from "react";

const Title = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="font-bold text-stone-700 text-xl">{children}</h1>;
};

export default Title;
