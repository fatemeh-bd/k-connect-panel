import React from "react";
import loginVector from "../../assets/images/loginVector.png";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center h-screen">
      <div className="lg:w-[40%] w-full bg-white h-full p-4 flex flex-col justify-center">{children}</div>
      <div className="lg:w-[60%] lg:block hidden h-full p-8">
        <img
          src={loginVector}
          alt="vector"
          className="h-full mr-auto object-contain"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
