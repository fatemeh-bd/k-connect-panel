import React from "react";

interface CustomSkeletonProps {
  className?: string;
  shape?: "circle" | "square" | "rectangle";
  width?: string;
  height?: string;
}

const CustomSkeleton: React.FC<CustomSkeletonProps> = ({
  className = "",
  shape = "rectangle",
  width = "w-full",
  height = "h-4",
}) => {
  const baseClasses =
    "animate-pulse  bg-gradient-to-r from-secondary-100 to-secondary-200";
  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-md",
    rectangle: "rounded",
  };

  return (
    <div
      className={`${baseClasses} ${shapeClasses[shape]} ${width} ${height} ${className}`}
      aria-hidden="true"
    />
  );
};

export default CustomSkeleton;
